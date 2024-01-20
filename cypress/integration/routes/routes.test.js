it('displays correct heading when navigating to mobsters route', () => {
    cy.task('db:reset').visit('/')
    cy.findByText(/view all mobsters/i).click()
    cy.findByRole('heading', { name: /mobsters/i }).should('exist')
})

it('resets the db and displays three mobsters on mobsters route', () => {
    cy.task('db:reset').visit('/mobsters')
    cy.findByText(/christopher moltisanti/i).should('exist')
    cy.findByText(/paulie walnuts/i).should('exist')
    cy.findByText(/tony soprano/i).should('exist')
})

it('displays the correct mobster name for mobster route that existed at build time', () => {
    cy.resetDbAndIsrCache().visit('/mobsters')
    cy.findByText(/tony soprano/i).click()
    cy.findByRole('heading', { name: /tony soprano/i }).should('exist')
})

it('displays error for mobster not found in db', () => {
    cy.task('db:reset')
    cy.visit('/mobsters/12345')
    cy.findByText(/NotFoundError: No Mobster found/i).should('exist')
})
