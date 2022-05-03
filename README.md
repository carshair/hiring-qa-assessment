# carSHAiR QA Assessment

![carSHAiR Logo](https://www.carshair.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FCarSHAiR-Logo.bfa0a90d.png&w=3840&q=75)
### Background

carSHAiR is a peer to peer car sharing platform with a mission to bring high tech solutions to provide an exceptional experience for Guests and Hosts within the car sharing space.

Often, our developers will produce untested code, and QA will assist in testing their work before it is accepted and merged. We will use this repository to assess your proficiency in source control and testing.

### Objectives

This repository is a simplified representation of our V2 backend APIs. It contains two branches - a `master` branch and a feature branch named `feature/authenticated-resource`. Your task is to branch off the feature branch, test the new feature, then merge your branch back into the feature branch. The branch you create should be named `feature/authenticated-resource-tests`.

### Project

In the `master` branch, there is only one route defined:

- GET /hello - a very simple health-check endpoint returning a greeting. This is to help you ensure the project is configured correctly.

In the `feature/authenticated-resource` branch, we have two new untested endpoints:

- `POST /auth/login` - an authorization endpoint. This endpoint relies on a v1 endpoint to validate credentials. For the purposes of this assignment, you can assume authorization is correctly implemented in v1 APIs.
- `POST /protected` - a protected resource. This endpoint should return a 401 status code unless the user's authorization is validated by V1.

### Scope Clarifications

- V1 is intentionally left unimplemented. Assume V1 is fully tested and operates according to logic used in `feature/authenticated-resource`.
- Any bugs found in the `feature/authenticated-resource` can be addressed in any of the following ways:
  - Produce a test which fails unless the bug is fixed
  - Create a branch which fixes the bug, merge that branch into `feature/authenticated-resource`, then sync `feature/authenticated-resource` into `feature/authenticated-resource-tests`
  - There is one bug intentionally included for you to find and address
- Coverage requirements are unspecified, but we would like to see test coverage as high as possible in the time allowed.

#### Constraints

- You may not modify `master`.
- Any changes to `feature/authenticated-resource` must be performed through merges to simulate reviewed pull requests.
- No additional packages should be required, but if you choose to install any, please provide an explanation of why they were added.

### Resources

- [Jest Docs](https://jestjs.io/docs/getting-started)
- [SuperTest README](https://github.com/visionmedia/supertest#supertest)
- [Routing-Controllers README](https://github.com/typestack/routing-controllers#routing-controllers)

### Submission Requirements

- Send us a link to your submission inside a git repository
  - Show us you are comfortable working with git by keeping a detailed git history
- Please omit the company name from your repository/project name
- (Optional) We are always trying to improve the assessment experience for future candidates. When sending your submission, please provide some feedback on the assessment description including details such as:
  - How long the assessment took to complete
  - Whether or not the requirements were clear
  - On a scale of 1 - 10, the level of difficulty
  - If given the choice, would they rather have done an Leet-code style assessment over a project-based assessment

  Feedback on the assessment description will not affect our evaluation of your submission.

## Template Project Setup

This template project is composed of the following stack:

- TypeScript
- Node.js v16.15+
- Express
- routing-controllers
- jest
- supertest

### Getting Started

To bring up the environment, perform the following steps:

1. Bring up express server in development mode

   ```bash
   # In your terminal
   yarn dev
   # Exposes express app on port 3000
   ```
