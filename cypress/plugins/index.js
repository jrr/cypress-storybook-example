/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  require("cypress-terminal-report/src/installLogsPrinter")(on, {
    printLogsToConsole: "always",
  });
  const dim = { w: 3840, h: 2160 };

  on("before:browser:launch", (browser, launchOptions) => {
    // https://docs.cypress.io/api/plugins/browser-launch-api#Set-screen-size-when-running-headless
    if (browser.name === "chrome" && browser.isHeadless) {
      // fullPage screenshot size is 1400x1200 on non-retina screens
      // and 2800x2400 on retina screens
      launchOptions.args.push(`--window-size=${dim.w},${dim.h}`);

      // force screen to be non-retina (1400x1200 size)
      launchOptions.args.push("--force-device-scale-factor=1");

      // force screen to be retina (2800x2400 size)
      // launchOptions.args.push('--force-device-scale-factor=2')
    }

    if (browser.name === "electron" && browser.isHeadless) {
      // fullPage screenshot size is 1400x1200
      launchOptions.preferences.width = dim.w;
      launchOptions.preferences.height = dim.h;
    }

    if (browser.name === "firefox" && browser.isHeadless) {
      // menubars take up height on the screen
      // so fullPage screenshot size is 1400x1126
      launchOptions.args.push(`--width=${dim.w}`);
      launchOptions.args.push(`--height=${dim.h}`);
    }

    return launchOptions;
  });
};
