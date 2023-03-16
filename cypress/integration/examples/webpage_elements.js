/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

const { should, expect } = require("chai")
const { frameLoaded } = require("cypress-iframe")
// const { beforeEach } = require("mocha")

const targetCountry = "India"
const expectAlertText = 'Hello , share this practice page and share your knowledge'
const expectConfirmText = 'Hello , Are you sure you want to confirm?'
const newTabDomainName = 'rahulshettyacademy'
const mentorshipPkgQty = 2
const pageUrl = '/AutomationPractice/'
const targetUrl = `${Cypress.env('rootUrl')}${pageUrl}`

describe('Webpage elements page', () => {
    beforeEach(() => {
        cy.visit(targetUrl)
    })

    it('clicks all the necessary checkboxes', () => {
        // checkboxes
        // cy.get('input[type="checkbox"]').as('checkboxes')
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        // cy.get('@checkboxes').eq(0).check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2', 'option3']).should('be.checked')
        cy.get('select').select('Option2').should('have.value', 'option2')
    })

    it('fills autocomplete field', () => {
        // autocomplete field
        cy.get('#autocomplete').type('ind')
        cy.get('li.ui-menu-item div').each(($el, index, $list) => {
            const countryName = $el.text()
            if (countryName === targetCountry){
                cy.wrap($el).click()
            }
        })
        cy.get('#autocomplete').should('have.value', targetCountry)
    })

    it('toggles visible/invisible elements', () => {
        // visible invisible
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })

    it('clicks radio buttons', () => {
        // radio buttons
        cy.get('input[type="radio"][name="radioButton"]').should('not.be.checked')
        cy.get('input[type="radio"][name="radioButton"][value="radio1"]').check()
        cy.get(['[value="radio2"]', '[value="radio3"]']).should('not.be.checked')
    })

    it('clicks alert/confirm buttons', () => {
        // alert button
        cy.get('#alertbtn').click()
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal(expectAlertText)
        })

        // confirm button
        cy.get('#confirmbtn').click()
        cy.on('window:confirm', (confirmText) => {
            expect(confirmText).to.equal(expectConfirmText)
        })
    })

    it('opens new tab and navigates back', () => {
        // open new tab and go back
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.url().should('contain', newTabDomainName).and('not.contain', 'AutomationPractice')
        cy.go('back')
        cy.url().should('contain', newTabDomainName).and('contain', 'AutomationPractice')
    })

    it('scans table', () => {
        // scanning table
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
            const productName = $el.text()
            if (productName.toLowerCase().includes('python')){
                cy.get('tr td:nth-child(2)').eq(index).next().then((price) => {
                    expect(price.text()).to.equal('25')
                })
            }
        })
    })

    it('mouse hovers over hidden list', () => {
        // mouse hover
        // make element visible, then click it
        // cy.get('div.mouse-hover-content').invoke('show').contains('Top').click()
        // force to click invisible element
        cy.get('div.mouse-hover-content').contains('Top').click({force: true})
        cy.url().should('include', 'top')
    })

    it('opens new window / tab', () => {
        cy.get('#opentab').then((el) => {
            let href = el.prop('href')
            cy.visit(href)
        })
    })

    it('switches to and validates iframe', () => {
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('a[href*="mentorship"]').eq(0).click()
        cy.wait(6000);
        // cy.url().should('not.contain', 'AutomationPractice').should('contain', 'mentorship')
        cy.iframe().find('h1[class*="pricing-title"]').should('have.length', mentorshipPkgQty)
    })
})