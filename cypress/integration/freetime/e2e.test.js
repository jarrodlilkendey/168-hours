it('navigate to free time calculator from home', () => {
    cy.visit('/')
    cy.get('[data-cy="freetime-tool-card"]').within(() => {
        cy.findByText(/Try It/i).click()
    })
    cy.findByRole('heading', { name: 'Free Time Calculator' }).should('exist')
})

it('update all fields with valid data and calculate free time', () => {
    cy.visit('/freetime')

    cy.findByLabelText(/Age/i).clear().type(40)

    cy.findByLabelText(/Sleeping/i)
        .clear()
        .type(10)

    cy.findByLabelText(/Working/i)
        .clear()
        .type(10)

    cy.findByLabelText(/Commuting/i)
        .clear()
        .type(10)

    cy.findByLabelText(/Exercise/i)
        .clear()
        .type(10)

    cy.findByLabelText(/Eating\/cooking/i)
        .clear()
        .type(10)

    cy.findByLabelText(/Chores/i)
        .clear()
        .type(10)

    cy.findByLabelText(/Grooming\/hygiene/i)
        .clear()
        .type(10)

    cy.findByLabelText(/Parenting duties/i)
        .clear()
        .type(10)

    cy.findByLabelText(/Other/i).clear().type(10)

    cy.findByRole('button', { name: 'Calculate Your Free Time' }).click()

    cy.findByRole('heading', { name: 'Results' }).should('exist')

    cy.findByText(/Free time hours per week/i).should('exist')

    cy.findByText(/Free time hours per day/i).should('exist')
})

it('update enter invalid data and calculate free time', () => {
    cy.visit('/freetime')

    cy.findByLabelText(/Sleeping/i)
        .clear()
        .type(100)

    cy.findByLabelText(/Working/i)
        .clear()
        .type(100)

    cy.findByLabelText(/Commuting/i)
        .clear()
        .type(100)

    cy.findByLabelText(/Exercise/i)
        .clear()
        .type(100)

    cy.findByLabelText(/Eating\/cooking/i)
        .clear()
        .type(100)

    cy.findByLabelText(/Chores/i)
        .clear()
        .type(100)

    cy.findByLabelText(/Grooming\/hygiene/i)
        .clear()
        .type(100)

    cy.findByLabelText(/Parenting duties/i)
        .clear()
        .type(100)

    cy.findByLabelText(/Other/i).clear().type(100)

    cy.findByRole('button', { name: 'Calculate Your Free Time' }).click()

    cy.findByRole('heading', { name: 'Results' }).should('exist')

    cy.findByText(/Free time hours per week/i).should('not.exist')

    cy.findByText(/Free time hours per day/i).should('not.exist')

    cy.findByText(/You have entered invalid numbers./i).should('exist')
})
