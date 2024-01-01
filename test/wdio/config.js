/* eslint-disable import/prefer-default-export */

export const config = {
  baseUrl: `http://localhost:${process.env.APORT || 3000}`,

  capabilities: [{ browserName: "chrome" }],

  debug: true,

  framework: "mocha",

  logLevel: "error",

  maxInstances: 1,

  mochaOpts: { timeout: 300000 },

  reporters: ["spec"],

  seleniumLogs: "./.selenium_output",

  services: ["selenium-standalone"],

  specs: ["./features/*.js"],

  before: async () => {
    await browser.setWindowSize(1600, 1000);
  },
};
