// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import ShopPage from "../integration/pages/protoCommerce/shopPage"



Cypress.Commands.add('addProductToCart', (productName) => {

    let shopPage = new ShopPage

    shopPage.productTitles().each(($el, index, $list) => {
        const currentProduct = $el.text()
        // cy.log("Current product is", currentProduct)
        if (currentProduct.includes(productName)){
            cy.log("MATCH: Adding product", currentProduct)
            shopPage.productPurchaseButtons().eq(index).click()
        }
    })
    
    
})

Cypress.Commands.add('getLoginToken', (url, reqBody) => {
    cy.request("POST", url, reqBody).then(response => {
        expect(response.status).to.equal(200)
        Cypress.env('accessToken', response.body.token)
    })
})
