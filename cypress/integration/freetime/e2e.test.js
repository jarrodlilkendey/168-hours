it('navigate to free time calculator from home', () => {
    cy.visit('/')
    cy.get('[data-cy="freetime-tool-card"]').within(() => {
        cy.findByText(/Try It/i).click()
    })
    cy.findByRole('heading', { name: 'Free Time Calculator' }).should('exist')
})
