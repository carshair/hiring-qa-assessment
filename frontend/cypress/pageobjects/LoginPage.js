class LoginPage {

    elements = {
        emailTextBox : '#email',
        passwordTextBox : '[name=password]',
        submitButton : '[name=submit]'
    };

    fillUserNameTextBox(value){
        cy.get(this.elements.emailTextBox).type(value);
    }

    fillPasswordTextBox(value){
        cy.get(this.elements.passwordTextBox).type(value);
    }

    clickSubmitButton(){
        cy.get(this.elements.submitButton).click();
    }

    performLogin(userName, password) {
        this.fillUserNameTextBox(userName);
        this.fillPasswordTextBox(password);
        this.clickSubmitButton();

    }

} export default LoginPage