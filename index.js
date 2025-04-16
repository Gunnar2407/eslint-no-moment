module.exports = {
    rules: {
      "no-moment-imports": require("./rules/no-moment-imports"),
    },
    configs: {
      recommended: {
        plugins: ["@Gunnar2407/moment"],
        rules: {
          "@Gunnar2407/moment/no-moment-imports": "error",
        },
      },
    },
  };