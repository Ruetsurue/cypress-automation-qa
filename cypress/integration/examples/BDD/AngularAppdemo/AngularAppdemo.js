const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { should } = require("chai");

Given('I visit AngularAppdemo website', function() {
    cy.visit(homePage.targetUrl)
})

When('I go to Library tab expecting one book', function() {
    cy.intercept(request, oneBookResponse).as('onebook')
    homePage.libraryButton().click()
    
})

When('I go to Library tab expecting multiple books', function() {
    cy.intercept(request, manyBooksResponse).as('manybooks')
    homePage.libraryButton().click()
})

When('I access different author', function(){
    cy.intercept('GET', homePage.libraryUrl, (request) => {
        request.url = homePage.mockLibraryUrl
        request.continue((response) => {
            expect(response.statusCode).to.equal(403)
        })
    }).as('differentAuthor')
})

Then('There is 403 Forbidden error', function(){
    homePage.libraryButton().click()
    cy.wait('@differentAuthor')
})

Then('There is only one book in result', function() {
    cy.wait('@onebook').then(() => {
        cy.get('table tr').should('have.length', onebookResponseLen + 1)
    })
})

Then('Sorry there is only one book message is displayed', function() {
    cy.contains(homePage.sorryText)
})

Then('There are multiple books in result', function() {
    cy.wait('@manybooks').then(() => {
        cy.get('table tr').should('have.length', manybooksResponseLen + 1)
    })
})

Then('Sorry there is only one book message is NOT displayed', function() {
    cy.contains(homePage.sorryText).should('not.exist')
})