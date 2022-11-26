class NoteDetailPage {

    elements = {
        noteIdLabel : '.Home_title__T09hD',
        noteTextLabel : '.Home_description__41Owk'
    };
    
    validateNoteIdLabelText(value){
        cy.get(this.elements.noteIdLabel).should('include.text', value);
    }
    
    validateNoteText(value){
        cy.get(this.elements.noteTextLabel).should('have.text', value);
    }
} export default NoteDetailPage