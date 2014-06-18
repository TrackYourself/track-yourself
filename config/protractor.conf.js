exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'mocha',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['app/tests/integration/*.test.js'],

  // Options to be passed to mocha.
  mochaOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
