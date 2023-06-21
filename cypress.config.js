

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "be3s6y",
  reporter: "mochawesome",
  reporterOptions:{
    "reportFilename": "[name]-report",
    "overwrite": true,
    "html": true,
    "json": true
  },
  e2e: {
    viewportHeight:1080,
    viewportWidth:1440,

    //baseUrl: 'https://vinyltamka.pl/',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});