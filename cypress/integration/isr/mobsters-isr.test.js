it('skips client-side bundle, confirming data from ISR cache', () => {
    // reference: https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
    cy.task('db:reset')
        .request('/mobsters')
        .its('body')
        .then((html) => {
            // remove the scripts, so they don't start automatically
            const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '')
            cy.state('document').write(staticHtml)
        })

    cy.findByText(/christopher moltisanti/i).should('exist')
    cy.findByText(/paulie walnuts/i).should('exist')
    cy.findByText(/tony soprano/i).should('exist')
})
