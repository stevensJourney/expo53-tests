// Learn more https://docs.expo.dev/guides/monorepos
const {getDefaultConfig} = require("expo/metro-config");
const path = require("node:path");

// Find the project and workspace directories
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
// This breaks with iOS Bundling failed 8ms node_modules/expo-router/entry.js (1 module)
// Unable to resolve "expo-router/entry-classic" from "node_modules/expo-router/entry.js"
// config.resolver.disableHierarchicalLookup = true;

// // we use this to not break supabase issue with ws package
config.resolver.unstable_conditionNames = ["react-native", "browser", "require"];

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: {
      blockList: {
        [require.resolve("@powersync/react-native")]: true,
      },
    },
  },
});

module.exports = config;
