import {AbstractPowerSyncDatabase, PowerSyncBackendConnector} from "@powersync/react-native";

export type DemoConfig = {
  backendUrl: string;
  powersyncUrl: string;
};

export class DemoConnector implements PowerSyncBackendConnector {
  readonly config: DemoConfig;

  constructor() {
    this.config = {
      backendUrl: "http://localhost:6060",
      powersyncUrl: "http://localhost:8080",
    };
  }

  async fetchCredentials() {
    const tokenEndpoint = "api/auth/token";
    const res = await fetch(`${this.config.backendUrl}/${tokenEndpoint}`);

    if (!res.ok) {
      throw new Error(`Received ${res.status} from ${tokenEndpoint}: ${await res.text()}`);
    }

    const body = await res.json();

    return {
      endpoint: this.config.powersyncUrl,
      token: body.token,
    };
  }

  async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
    const transaction = await database.getNextCrudTransaction();

    if (!transaction) {
      return;
    }

    try {
      let batch: any[] = [];
      for (let operation of transaction.crud) {
        let payload = {
          op: operation.op,
          table: operation.table,
          id: operation.id,
          data: operation.opData,
        };
        batch.push(payload);
      }

      const response = await fetch(`${this.config.backendUrl}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({batch}),
      });

      if (!response.ok) {
        throw new Error(`Received ${response.status} from /api/data: ${await response.text()}`);
      }

      await transaction.complete();
    } catch (ex: any) {
      console.debug(ex);
      throw ex;
    }
  }
}
