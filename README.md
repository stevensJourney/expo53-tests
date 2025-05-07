# Test

This is a small Expo 53 demo created with `npx create-expo-app@latest StickerSmash` which has been roughly extended to use PowerSync.

This repo tries to reproduce the issue from [this](https://discord.com/channels/1138230179878154300/1368002766404063262/1368002766404063262) Discord post.

## Getting Started

The dependencies here try and match the dependencies mentioned [here](https://discord.com/channels/1138230179878154300/1367937337438507200/1369452321666498650). This requires Yarn in order to install correctly (the base template app installs with NPM, but not after applying these changes).

```bash
yarn install
```

The demo here can be tested against a Supabase (default) backend or local self hosted backend.

### Supabase

The connect logic in `app/(tabs)/index.tsx` is configured to use Supabase by default. The schema follows that of our [Todolist demo](https://github.com/powersync-ja/self-host-demo/blob/main/demos/supabase/supabase/migrations/20240712064101_configure_powersync.sql).

- Copy the `.env.template` file to a `.env` file and input the required values.
- Run the App and click the `Create an Item` button. This should create an item locally which should be uploaded.
- Uploads should succeed.

### Self hosted Node.js backend

This demo can be configured to attempt uploads to a locally hosted Node.js backend. See our [self hosted demo](https://github.com/powersync-ja/self-host-demo/tree/main/demos/nodejs) for more details.

- Change the `connect` call in `app/(tabs)/index.tsx` to connect using the `DemoConnector`.
- Run the Node.Js self hosted demo using Docker compose.
- Run the app. If using Android, remember to proxy local ports to the device.

```bash
adb reverse tcp:8080 tcp:8080
adb reverse tcp:6060 tcp:6060
```
