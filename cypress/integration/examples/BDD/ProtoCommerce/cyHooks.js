import HomePage from '../../../pages/protoCommerce/homePage'
import ShopPage from '../../../pages/protoCommerce/shopPage'

// create page objects for testing
before(() => {
    Cypress.config('defaultCommandTimeout', 8000)
    cy.fixture('protoCommerce').then(testData => {
        globalThis.testData = testData})
        globalThis.homePage = new HomePage()
        globalThis.shopPage = new ShopPage()
})

// open corresponding page
// beforeEach(() => {
//     cy.visit(homePage.targetUrl)
// })
