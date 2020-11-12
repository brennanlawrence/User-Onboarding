describe("Test 1", function() {

    it("Visits new site", function() {
        cy.visit("index.html");
    })
})

describe("Test Form", function() {

    it("Takes name in Name input", function() {
        cy.visit("index.html");
        cy.get(".name").type("Grok");
    })

    it("Takes email in Email input", function() {
        cy.visit("index.html");
        cy.get(".email").type("grok@grok.com");
    })

    it("Takes password in Password input", function() {
        cy.visit("index.html");
        cy.get(".password").type("grokgrokgr0k");
    })

    it("Checks Terms checkbox", function() {
        cy.visit("index.html");
        cy.get(".terms").click();
    })

    it("Can Submit Data", function() {
        cy.visit("index.html");
        cy.get(".name").type("Grok");
        cy.get(".email").type("grok@grok.com");
        cy.get(".password").type("grokgrokgr0k");
        cy.get(".terms").click();
        cy.get("button").click();
    })

    it("Can't Submit Data if a form is empty", function() {
        cy.visit("index.html");
        cy.get(".name").type("Grok");
        cy.get(".email").type("grok@grok.com");
        const button = cy.get("button");
        expect(button).to.not.respondTo(button.click);
    })
})