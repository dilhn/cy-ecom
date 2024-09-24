const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://askomdch.com/",
    setupNodeEvents(on, config) {},
  },
});
