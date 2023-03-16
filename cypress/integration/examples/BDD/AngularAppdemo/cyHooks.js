import HomePage from "../../../pages/AngularAppdemo/homePage"

before(() => {
    globalThis.homePage = new HomePage()

    let request = {
        url: "/Library/GetBook.php?AuthorName=shetty",
        method: "GET"
    }

    let oneBookResponse = {
        statuscode: 200,
        body: [
            {
                "book_name": "RobotFramework",
                "isbn": "984353",
                "aisle": "982053"
            }
        ]
    }

    let manyBooksResponse = {
        statuscode: 200,
        body: [
            {
                "book_name": "RobotFramework",
                "isbn": "984353",
                "aisle": "982053"
            },
            {
                "book_name": "Monty Python",
                "isbn": "121696",
                "aisle": "982053"
            },
            {
                "book_name": "Cypress for dummies",
                "isbn": "400701",
                "aisle": "982053"
            },
        ]
    }

    globalThis.request = request
    globalThis.oneBookResponse = oneBookResponse
    globalThis.onebookResponseLen = oneBookResponse.body.length

    globalThis.manyBooksResponse = manyBooksResponse
    globalThis.manybooksResponseLen = manyBooksResponse.body.length
    // cy.intercept(request, oneBookResponse).as('onebook')
    // cy.intercept(request, manyBooksResponse).as('manybooks')
})
