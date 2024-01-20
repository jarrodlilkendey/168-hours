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

const { resetDB } = require('../../__tests__/api/prisma/reset-db')

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET
    config.env.TEST_USER_EMAIL = process.env.TEST_USER_EMAIL
    config.env.TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD

    on('task', {
        'db:reset': () => resetDB().then(() => null),
    })

    return config
}
