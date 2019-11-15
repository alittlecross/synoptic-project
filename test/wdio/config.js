exports.config = {

  baseUrl: `http://localhost:${process.env.APORT || 3000}`,

  capabilities: [ { browserName: 'chrome' } ],

  debug: true,

  framework: 'mocha',

  logLevel: 'error',

  maxInstances: 1,

  mochaOpts: { timeout: 300000 },

  reporters: [ 'spec' ],

  seleniumLogs: './.selenium_output',

  services: ['selenium-standalone'],

  specs: [ './test/wdio/features/*.js' ],

  before: (capabilities, specs) => {
    browser.setWindowSize(1600, 1000)
  }
}
