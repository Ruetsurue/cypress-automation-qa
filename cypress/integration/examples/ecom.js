const neatCSV = require('neat-csv')

describe('ecom shop', () => {


    before(() => {
        cy.fixture('ecom').then((testdata) => {
            globalThis.testdata = testdata
        }).then( testdata => {
            cy.getLoginToken(testdata.loginURL, {
                userEmail: testdata.userEmail,
                userPassword: testdata.userPassword,
            })
        })
        Cypress.config("defaultCommandTimeout", 8000)
    })


    it('login, make purchase, place order and download CSV', async () => {
        cy.visit(testdata.homePageURL, {
            onBeforeLoad: (window) => {
                window.localStorage.setItem('token', Cypress.env('accessToken'))
            }
        })

        // cy.get("div.card-body button:last-child").click({ multiple: true })
        let productNames = []
        cy.get("div.card-body").each(($el, index, $list) => {
            productNames.push($el.find("h5 b").text())
            cy.get("div.card-body button:last-child").eq(index).click()
        })//.then(() => cy.log(productNames))

        cy.get("[routerlink*='cart']").click()
        cy.contains("Checkout").click()
        cy.get("div.details__user input:first-child").type('ind')
        cy.get("section.ta-results button").each(($el, index, $list) => {
            if($el.text() === " India"){
                cy.wrap($el).click()
            }
        })
        cy.contains("Place Order", { matchCase: false}).click()
        cy.get("h1").contains("thankyou", { matchCase: false})
        cy.wait(4000)
        cy.contains("CSV", { matchCase: false}).click()

        // scan CSV document and compare item names
        let customerName = testdata.userEmail.split('@')[0]
        cy.readFile(`${Cypress.config('fileServerFolder')}/cypress/downloads/order-invoice_${customerName}.csv`)
            .then( async (filecontent) => {
                const csv = await neatCSV(filecontent)
                let csvProducts = csv.map(value => value["Product Name"]).sort()
                productNames.sort()
                productNames.forEach((productName, index) => {
                    expect(productName).to.eq(csvProducts[index])
                })
            })

    })
})
