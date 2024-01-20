it('displays the correct mobster name for mobster route that didnt exist at build time', () => {
    cy.task('db:reset').visit('/mobsters')
    cy.findByText(/junior soprano/i).should('not.exist')
    cy.visit('/character')
    cy.findByLabelText(/name/i).type('junior soprano')
    cy.findByRole('button', { name: /submit/i }).click()
    cy.wait(3001)
    cy.visit('/mobsters').reload()
    cy.findByText(/junior soprano/i).click()
    cy.findByRole('heading', { name: /junior soprano/i }).should('exist')
    cy.resetDbAndIsrCache()
})
