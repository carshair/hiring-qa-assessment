class SearchPage {

    elements = {
        searchByTextTextBox : '#searchText',
        searchByOwnerTextBox : '[name=searchOwner]',
        noteIdLabel : '.Search_card__6y8CF>h2',
        noteOwnerNameLabel : '.Search_card__6y8CF>h4',
        noteTextLabel : '.Search_card__6y8CF>p',
    }

    fillSearchByTextTextBox(value){
        cy.wait(20000);
        cy.get(this.elements.searchByTextTextBox).type(value);
        cy.wait(2000);
    }

    clickNoteTile(){
        cy.get(this.elements.noteIdLabel).click();
    }

    fillSearchByOwnerTextBox(value){
        cy.get(this.elements.searchByOwnerTextBox).type(value);
    }

    validateNoteIdLabelContains(value) {
        cy.get(this.elements.noteIdLabel).should('include.text', value);
    }

    validateNoteTextEquals(value) {
        cy.get(this.elements.noteTextLabel).should('have.text', value);
    }
} export default SearchPage