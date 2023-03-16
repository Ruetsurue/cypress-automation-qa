
class ShopPage {

    purchaseSuccessMsg = 'Success! Thank you! Your order will be delivered in next few weeks :-)'

    productTitles(){
        return cy.get('app-card .card-body .card-title')
    }

    productPurchaseButtons(){
        return cy.get("app-card button.btn.btn-info")
    }

    checkoutButton(){
        return cy.contains('Checkout')
    }

    shoppingCartCheckout(){
        return cy.contains('Checkout')
    }

    deliveryCountry(){
        return cy.get('#country')
    }

    deliveryCountrySuggestion(){
        return cy.get('.suggestions > ul > li > a')
    }

    agreeWithTermsAndConditions(){
        return cy.get('#checkbox2')
    }

    purchaseButton(){
        return cy.get('input.btn-success[value="Purchase"]')
    }

    purchaseSuccessAlert(){
        return cy.get('.alert')
    }

    productPrices(){
        return cy.get('tr td:nth-child(4)')
    }

    checkShoppingCartTotal(){
        this.cartTotalPrice().then((total) => {
            
            let calculatedTotal = 0
            this. productPrices().each(($el, index, $list) => {
                let price = 0
                try {
                    price = $el.text().split(' ')[1].trim()
                } catch(TypeError) {
                    return
                }
                
                calculatedTotal += Number(price)

            }).then(() => {
                expect(total).to.equal(calculatedTotal)
                })
            

        })
    }


    cartTotalPrice(){
        let total = cy.get('tbody tr:nth-last-child(2) td:last-child strong').then((cartTotal) => { 
            cartTotal = cartTotal.text().split(' ')[1].trim()
            return Number(cartTotal)
        })

        return total

    }
}

export default ShopPage