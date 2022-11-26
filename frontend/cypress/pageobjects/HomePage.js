class HomePage {

    elements = {
        helloWorldLabel : '.Home_description__41Owk'
    }
    
    validateHelloWorldLabelIsPresent(){
        cy.get(this.elements.helloWorldLabel, { timeout: 10000 }).should('be.visible');
    }
} export default HomePage