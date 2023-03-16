class HomePage {

    get libraryUrl() {
        return 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    }

    get mockLibraryUrl() {
        return "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
    }

    get targetUrl() {
        return `${Cypress.env('angularDemoRootUrl')}`
    }

    libraryButton(){
        // return cy.contains('Virtual Library')
        return cy.get('button').contains('Virtual Library')
    }

    tableRows(){
        cy.get('tbody tr')
    }

    get sorryText() {
        return "Oops only 1 Book available"
    }
}

export default HomePage