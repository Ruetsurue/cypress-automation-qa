Feature: ProtoCommerce website

    @regression
    Scenario: Make purchase

        Given I visit ProtoCommerce website
        When I click Shop tab
        And Add items to cart
        And Validate the total amount
        And Select the delivery country
        And Confirm purchase
        Then Purchase is made and thank you message is displayed

    @smoke
    Scenario: Validate home page input

        Given I visit ProtoCommerce website
        When I input customer name
        And Select gender
        Then Customer name is duplicated in bottom field
        And Enterpreneur employment status is disabled
        