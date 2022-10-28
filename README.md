# CarSHAiR QA Assessment

![CarSHAiR Logo](https://www.carshair.com/CarSHAiR-Logo.png)

## Background

CarSHAiR is a peer to peer car sharing platform with a mission to bring high tech solutions to provide an exceptional experience for Guests and Hosts within the car sharing space.

Often, our developers will produce code, and QA will assist in testing their work before it is accepted and merged. We will use this repository to assess your proficiency in testing.

### Objectives

This repository is a simple notes application. There are more than five bugs intentionally included. Your goal is to identify and report these bugs in as much detail as is reasonable. We hope to see:
* Brief description of the bug
* Screenshots, error messages, any other supporting details
* Steps to reproduce the bug
* What type of bug this is (Cosmetic/Functional/Security)
* Estimated difficulty to fix the bug

For bonus points, you may also submit fixes.

### Setup

#### Pre-deployed
If you want to get started right away, you can visit the deployed application:
[Deployed QA Hiring Assignment](https://master.hiring-assignment.qa.c66.me/)

#### Run it locally

Install the project dependencies, including Git, Docker, NodeJS, and Yarn
* https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
* https://docs.docker.com/get-docker/
* https://nodejs.org/en/download/
* https://yarnpkg.com/getting-started/install

Clone the repository:

`git clone git@github.com:carshair/hiring-qa-assessment.git`

Change directories:

`cd hiring-qa-assessment`

#### MySQL

Create a `.env` file:

`touch .env`

Add values for the following variables:
- MYSQL_DATABASE
- MYSQL_USER
- MYSQL_PASSWORD
- MYSQL_ROOT_PASSWORD
- MYSQL_PORT
- ALLOWED_ORIGIN=http://localhost:3001

Start the mysql server:

`docker-compose up -d mysql`

#### Backend

Create a `.env` file:

`touch backend/.env`

Add values for the following variables (these should match MySQL values):
- TYPEORM_HOSTNAME
- TYPEORM_USERNAME
- TYPEORM_DATABASE
- TYPEORM_PASSWORD
- TYPEORM_PORT

Start the server in development mode:

`cd backend && yarn dev`


#### Frontend

Edit the `.env` in the `frontend` folder. Set the following variable:

- NEXT_PUBLIC_API_URL=http://localhost:3001

In a separate terminal window, start the server in development mode:

`cd frontend && yarn dev`

### Project Description

#### Frontend

The frontend is a NextJS application. We've implemented a notes app, though there are some issues.

The pages we expect to be tested are:

- `GET /`

  This homepage indicates whether the project is set up correctly.

- `GET /search`

  A form to search notes by text and owner email address. The search results displayed on the same page.

- `GET /login`

  Allows you to log into the site. This will be necessary for further testing.

- `GET /note/{noteId}`

  Displays the contents of the selected note.

- `GET /profile`

  Displays information about your account. Displays notes you own. Allows creation of new notes.

#### Backend

The backend is an Express application using TypeORM. We've defined a number of API routes:

- `GET /hello`

  A simple API route that returns static content. The message returned from this endpoint is displayed on the homepage. This is used to validate the servers are running and CORS is working correctly.

- `POST /login`

  {
    "email": "tester@shair.co",
    "password": "secure-password-for-assessment"
  }

  A route that when given a valid email/password combination, returns a login token.

- `POST /note`

  {
    "text": "Sample note!",
    "userId": "81737cbc-52eb-433f-bafe-c6b9b36b6503"
  }

  Required Cookies: `token`

  Creates a note owned by the current user with the given text content.

- `GET /note/:noteId`

  Required Cookies: `token`

  Returns information about the specified note. You are allowed to view notes owned by any user.

- `GET /profile`

  Required Cookies: `token`

  Returns information about your user, including all notes you own.

- `POST /search`

  {
    "text": "note substring"
    "size": 10,
    "skip": 0
  }
  Returns notes containing the specified substring

### Scope Clarifications
- We hope for the frontend to be tested with Cypress and the backend to be tested with Postman or Jest, but use whatever tools you deem best.
- Please implement regression tests for any bugs you find. Your regression tests should fail until fixes are implemented.
- For bonus points, you may implement bug fixes.
- If you choose to implement tests using jest, we have no specified coverage requirement. We would like to see coverage as high as reasonable in the allotted time.

### Resources

- [Jest Docs](https://jestjs.io/docs/getting-started)
- [SuperTest README](https://github.com/visionmedia/supertest#supertest)
- [Cypress Docs](https://docs.cypress.io/api/table-of-contents)

### Submission Requirements

- Send us a link to your submission inside a git repository
  - Show us you are comfortable working with git by keeping a detailed git history
- Please omit the company name from your repository/project name
- (Optional) We are always trying to improve the assessment experience for future candidates. When sending your submission, please provide some feedback on the assessment description including details such as:
  - How long did the assessment take to complete?
  - Were the requirements clear?
  - On a scale of 1 - 10, what was the level of difficulty?
  - How can we improve this assessment?

Feedback on the assessment description will not affect our evaluation of your submission.

## Project Stack

This template project is composed of the following stack:

- TypeScript
- Node.js v16.5+
- Express
- routing-controllers
- NextJS
