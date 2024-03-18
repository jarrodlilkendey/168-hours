it('navigate to schedule maker from home', () => {
    cy.visit('/')
    cy.get('[data-cy="schedules-tool-card"]').within(() => {
        cy.findByText(/Try It/i).click()
    })
    cy.findByRole('heading', { name: 'My Schedules' }).should('exist')
})
