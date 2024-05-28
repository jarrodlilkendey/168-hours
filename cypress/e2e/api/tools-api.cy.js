it('gets a list of tools from the API', () => {
    cy.request('GET', '/api/tools').then((response) => {
        // 200 status in response
        expect(response.status).to.eq(200)

        // array to be of length 4
        expect(response.body.length).to.eq(4)

        // check attributes on response
        expect(response.body[0].name).to.eq('Free Time Calculator')
        expect(response.body[1].link).to.eq('/track')
        expect(response.body[2].description).to.eq('Create a weekly schedule')
        expect(response.body[3].testId).to.eq('habits-tool-card')
    })
})
