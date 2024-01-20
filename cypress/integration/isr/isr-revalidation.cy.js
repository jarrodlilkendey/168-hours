it('should load refreshed page from cache after new mobster is added', () => {
    // check that new mobster is not on page
    cy.task('db:reset').visit('/mobsters')
    cy.findByText(/junior soprano/i).should('not.exist')

    // add new mobster via post request to api
    const newMobster = { name: 'Junior Soprano' }
    const secret = Cypress.env('REVALIDATION_SECRET')

    cy.request('POST', `/api/mobsters?secret=${secret}`, newMobster).then(
        (response) => {
            expect(response.body.revalidated).to.equal(true)
        }
    )

    // reload page; new band should appear
    cy.reload()
    cy.findByText(/junior soprano/i).should('exist')

    // reset ISR cache to initial db conditions
    cy.resetDbAndIsrCache()
})
