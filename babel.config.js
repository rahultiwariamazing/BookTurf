/**
 * Babel configuration for Expo + NativeWind + Reanimated.
 * Reanimated plugin must remain last in the plugin list.
 */
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: ["react-native-reanimated/plugin"],
    };
};
