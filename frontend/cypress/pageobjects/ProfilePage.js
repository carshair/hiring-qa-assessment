class ProfilePage {

    elements = {
        noteContentTextBox : '#noteText',
        submitButton : '[type=submit]'
    };

    fillNoteContentTextBox(value){
        cy.get(this.elements.noteContentTextBox).type(value);
    }

    clickSubmitButton(){
        cy.get(this.elements.submitButton).click();
    }
} export default ProfilePage