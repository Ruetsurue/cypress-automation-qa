const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor")


Given('I visit ProtoCommerce website', function() {
    cy.visit(homePage.targetUrl)
})

When('I click Shop tab', function() {
    homePage.shopPageButton().click()
})

When('Add items to cart', function() {
    testData.productsForBasket.forEach((product, index, productList) => {
        cy.addProductToCart(product)
    })
    shopPage.checkoutButton().click()
})

When('Validate the total amount', function() {
    shopPage.checkShoppingCartTotal()
    shopPage.shoppingCartCheckout().click()
})

When('Select the delivery country', function() {
    shopPage.deliveryCountry().type(testData.deliveryCountry)
    shopPage.deliveryCountrySuggestion().contains(testData.deliveryCountry, { matchCase: false }).click()
})

When('Confirm purchase', function() {
    shopPage.agreeWithTermsAndConditions().check({ force: true })
    shopPage.purchaseButton().contains('Purchase').click()
})

Then('Purchase is made and thank you message is displayed', function() {
    shopPage.purchaseSuccessAlert().contains(shopPage.purchaseSuccessMsg)
})


// Validate home page inputs

When('I input customer name', function(){
    // type customer name and ensure minlength
    homePage.custName().type(testData.customerName).should('have.attr', 'minLength', testData.expectCustNameMinLen)
})

When('Select gender', function(){
     // select gender
     homePage.gender().select(testData.gender)
})
        
Then('Customer name is duplicated in bottom field', function() {
    // check two-way binding
    homePage.duplicateCustName().should('have.value', testData.customerName)
})
       
Then('Enterpreneur employment status is disabled', function() {
    // ensure enterpreneur custType is disabled
    homePage.employmentStatusEnterpreneur().should('be.disabled')
})
