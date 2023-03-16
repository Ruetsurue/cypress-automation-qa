
class protoCommerceMainPage {

    pageUrl = '/angularpractice/'

    get targetUrl() {
        return `${Cypress.env('rootUrl')}${this.pageUrl}` 
    }

    custName(){
        cy.get('input[name="name"]:nth-child(2)').as('custName')
        return cy.get('@custName')
    }

    duplicateCustName(){
        cy.get('input[name="name"]:nth-child(1)').as('duplicateCustName')
        return cy.get('@duplicateCustName')
    }

    gender(){
        return cy.get('select#exampleFormControlSelect1')
    }

    employmentStatusEnterpreneur(){
        return cy.get('#inlineRadio3')
    }

    shopPageButton(){
        return cy.contains('Shop')
    }
}

export default protoCommerceMainPage