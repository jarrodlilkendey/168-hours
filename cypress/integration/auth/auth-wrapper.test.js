it('runs auth flow for successful login to protected page', () => {
    cy.task('db:reset').visit('/user')

    // shows sign in form
    cy.findByRole('heading', { name: /Sign in to your account/i }).should(
        'exist'
    )

    // enter credentials
    cy.findByLabelText(/Email address/i)
        .clear()
        .type(Cypress.env('TEST_USER_EMAIL'))

    cy.findByLabelText(/password/i)
        .clear()
        .type(Cypress.env('TEST_USER_PASSWORD'))

    // submit form
    cy.findByRole('main').within(() => {
        cy.findByRole('button', { name: /Sign in/i }).click()
    })

    // verify login success
    cy.findByRole('heading', { name: /welcome /i }).should('exist')
})

it('runs auth flow for failed login to protected page', () => {
    cy.task('db:reset').visit('/user')

    // shows sign in form
    cy.findByRole('heading', { name: /Sign in to your account/i }).should(
        'exist'
    )

    // enter credentials
    cy.findByLabelText(/Email address/i)
        .clear()
        .type(Cypress.env('TEST_USER_EMAIL'))

    cy.findByLabelText(/password/i)
        .clear()
        .type('incorrect password')

    // submit form
    cy.findByRole('main').within(() => {
        cy.findByRole('button', { name: /Sign in/i }).click()
    })

    // verify login failure
    cy.findByText(/sign in failed/i).should('exist')
})

it('redirects to sign in for protected pages', () => {
    cy.fixture('protected-pages.json').then((protectedPages) => {
        protectedPages.forEach((page) => {
            cy.task('db:reset').visit(page)
            cy.findByLabelText(/Email address/i).should('exist')
            cy.findByLabelText(/password/i).should('exist')
        })
    })
})
