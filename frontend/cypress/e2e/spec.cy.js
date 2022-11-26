import HomePage from '../pageobjects/HomePage'
import SearchPage from '../pageobjects/SearchPage'
import LoginPage from '../pageobjects/LoginPage'
import NoteDetailPage from '../pageobjects/NoteDetailPage'

describe('empty spec', () => {
  const homePage = new HomePage();
  const searchPage = new SearchPage();
  const loginPage = new LoginPage();
  const noteDetailPage = new NoteDetailPage();
  const url_HomePage = "https://master.hiring-assignment.qa.c66.me";
  const url_loginPage = "https://master.hiring-assignment.qa.c66.me/login";
  const url_SearchPage = "https://master.hiring-assignment.qa.c66.me/search";
  const url_NoteDetailPage = "https://master.hiring-assignment.qa.c66.me/note/";
  const userName = "tester@shair.co";
  const password = "secure-password-for-assessment";
  const noteID = '51e9fe18-8e2d-45b4-aab2-e3c85b20ef75';
  const noteBody = 'Sai Kumar';


  it('Check project is setup correctly', () => {
    cy.visit(url_HomePage);
    homePage.validateHelloWorldLabelIsPresent();
  })

  it('Validate functionality perform valid login.', () => {
    cy.visit(url_loginPage);
    loginPage.performLogin(userName, password);
    homePage.validateHelloWorldLabelIsPresent();
  })

  it('Validate search by Text functionality', () => {
    cy.visit(url_loginPage);
    loginPage.performLogin(userName, password);
    homePage.validateHelloWorldLabelIsPresent();
    cy.visit(url_SearchPage);
    searchPage.fillSearchByTextTextBox(noteBody);
    searchPage.validateNoteIdLabelContains(noteID);
    searchPage.validateNoteTextEquals(noteBody);
  })

  it('Validate functionality check contents', () => {
    cy.visit(url_loginPage);
    loginPage.performLogin(userName, password)
    homePage.validateHelloWorldLabelIsPresent();
    cy.visit(url_NoteDetailPage + noteID);
    noteDetailPage.validateNoteIdLabelText(noteID);
    noteDetailPage.validateNoteText(noteBody)
  })

  it.only('Validate Search and Check Note Details of Note with invalid Owner', () => {
    cy.visit(url_loginPage);
    loginPage.performLogin(userName, password);
    homePage.validateHelloWorldLabelIsPresent();
    cy.visit(url_SearchPage);
    searchPage.fillSearchByTextTextBox("testing");
    searchPage.clickNoteTile();
    noteDetailPage.validateNoteText(noteBody)
  })

})