Feature: Angular Appdemo

    Scenario: Library one book
        Given I visit AngularAppdemo website
        When I go to Library tab expecting one book
        Then There is only one book in result
        And Sorry there is only one book message is displayed

    Scenario: Library multiple books
        Given I visit AngularAppdemo website
        When I go to Library tab expecting multiple books
        Then There are multiple books in result
        And Sorry there is only one book message is NOT displayed

    Scenario: Library access to books by different author
        Given I visit AngularAppdemo website
        When I access different author
        Then There is 403 Forbidden error