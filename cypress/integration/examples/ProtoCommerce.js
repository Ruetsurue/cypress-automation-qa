
import HomePage from '../../../pages/protoCommerce/homePage'
import ShopPage from '../../../pages/protoCommerce/shopPage'

describe('ProtoCommerce testing', () => {

    before(() => {
        Cypress.config('defaultCommandTimeout', 8000)
        cy.fixture('protoCommerce').then(testData => {
            globalThis.testData = testData})
            
        globalThis.homePage = new HomePage()
        globalThis.shopPage = new ShopPage()
    })

    beforeEach(() => {
        cy.visit(homePage.targetUrl)
    })

    it('performs signup', () => {

        
        // type customer name and ensure minlength
        homePage.custName().type(testData.customerName).should('have.attr', 'minLength', testData.expectCustNameMinLen)

        // select gender
        homePage.gender().select(testData.gender)
        
        // check two-way binding
        homePage.duplicateCustName().should('have.value', testData.customerName)

        // ensure enterpreneur custType is disabled
        homePage.employmentStatusEnterpreneur().should('be.disabled')

    })

    it.only ('goes to shop and adds items to shopping cart', () => {
        homePage.shopPageButton().click()
        testData.productsForBasket.forEach((product, index, productList) => {
            cy.addProductToCart(product)
        })

        shopPage.checkoutButton().click()
        shopPage.checkShoppingCartTotal()
        shopPage.shoppingCartCheckout().click()
        shopPage.deliveryCountry().type(testData.deliveryCountry)
        shopPage.deliveryCountrySuggestion().contains(testData.deliveryCountry, { matchCase: false }).click()
        shopPage.agreeWithTermsAndConditions().check({ force: true })
        shopPage.purchaseButton().contains('Purchase').click()
        shopPage.purchaseSuccessAlert().contains(shopPage.purchaseSuccessMsg)
    })

})