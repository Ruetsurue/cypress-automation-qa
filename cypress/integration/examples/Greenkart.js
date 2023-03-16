/// <reference types="Cypress" />

const addToCartCaption = "ADD TO CART"
const checkoutCaption = "PROCEED TO CHECKOUT"
const orderCaption = "Place Order"
const productsList = ['Capsicum', 'Cashews - 1 Kg']
const pageUrl = '/seleniumPractise/#/'
const targetUrl = `${Cypress.env('rootUrl')}${pageUrl}`

describe("Greenkart", function(){
    it("adds products to cart and places order", function(){
        cy.visit(targetUrl)
        cy.get('input[type="search"].search-keyword').type('ca')
        cy.get('button.search-button').click()
        // cy.get('.products').find('.product')
        cy.get('.products .product').as('products')
        cy.get('@products').should('have.length', 4)
        // products.eq(3).contains(addToCartCaption).click()

        cy.get('@products').each(($el, index, $list) => {
            cy.wrap($el).find('h4').should('have.class', 'product-name')

            const productName = $el.find('h4.product-name').text()
            cy.log(productName)

            if (productsList.includes(productName)){
                cy.wrap($el).find('button').click()
            }
        })

        cy.get('.cart-icon > img').click()
        cy.contains(checkoutCaption).click()
        cy.contains(orderCaption).click()
        cy.get('.chkAgree').check()
        cy.get('select').select('Armenia').should('have.value', 'Armenia')
        cy.contains('Proceed').click()
        cy.contains('Thank you')
        cy.contains('Thank you', {timeout: 10000}).should('not.exist')

    })
})