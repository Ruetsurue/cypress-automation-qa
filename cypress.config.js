const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    // specPattern: 'cypress/integration/examples/*.js',
    specPattern: ["**/*.feature", 'cypress/integration/examples/*.js']
  },

  env: {
    "rootUrl": "https://rahulshettyacademy.com",
    "angularDemoRootUrl": "https://rahulshettyacademy.com/angularAppdemo/"
  },
  
  projectId: "ijq7od",
});
