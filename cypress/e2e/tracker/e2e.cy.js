it('navigate to time tracker from home', () => {
    cy.visit('/')
    cy.get('[data-cy="track-tool-card"]').within(() => {
        cy.findByText(/Try It/i).click()
    })
    cy.findByRole('heading', { name: 'Time Tracker' }).should('exist')
})
