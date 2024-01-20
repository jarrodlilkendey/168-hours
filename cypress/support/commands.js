import '@testing-library/cypress/add-commands'

Cypress.Commands.add('resetDbAndIsrCache', () => {
    cy.task('db:reset')
    const secret = Cypress.env('REVALIDATION_SECRET')
    cy.request('GET', `/api/revalidate?secret=${secret}`)
})

// Cypress.Commands.add('reloadForISR', () => {
//     if (Cypress.env('github_action')) {
//         // exponential dropoff for failing CI tests to wait for db
//         // update to "take" before reloading page, to mitigate test flake

//         //  https://docs.cypress.io/guides/guides/test-retries#Can-I-access-the-current-attempt-counter-from-the-test
//         // eslint-disable-next-line no-underscore-dangle
//         const attempt = cy.state('runnable')._currentRetry
//         if (attempt > 0) {
//             const waitDelay = 2 ** attempt * 1000
//             cy.log(
//                 `!! increasing ISR cache refresh delay to ${waitDelay}ms for attempt ${attempt}`
//             )
//             cy.wait(waitDelay)
//         }
//     }
//     cy.reload()
// })
