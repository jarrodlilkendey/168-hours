it('navigate to habits tracker from home', () => {
    cy.visit('/')
    cy.get('[data-cy="habits-tool-card"]').within(() => {
        cy.findByText(/Try It/i).click()
    })
    cy.findByRole('heading', { name: 'Habit Tracker' }).should('exist')
})
