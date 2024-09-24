const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://askomdch.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true, // Enable Cypress Studio
  },
});
