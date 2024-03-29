# Protected Dashboard

This project is a test assignment for a JS Developer position.

It is an SPA which uses JWT Token for user authentication and authorization and shows a secret page with exam results from a database for an authorized user.\
For more details, [go to Task section](#task).

![demo](demo.gif)

## Getting started

Clone this repository to your computer. 
> If you are not familiar with cloning GitHub repositories, check [GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

In the Terminal, go to the cloned project directory.

Run following command to install all necessary dependencies:
> If you don't have npm installed on your computer, follow [npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) tutorial to install it.
```
npm i
```
Then run this command to start the project (it will start both the client and the server side of the application):
```
npm run start
```

After that, your browser should automatically open a new tab and display a Sign In page of this application. If it didn't happen, type
```
http://localhost:3000/
```
in the adress bar of your browser.

You are now ready to explore the Protected Dashboard application!

## Signing In

Since this is a test task and the backend is mocked, you can find an open user database [here](/src/server/users.json) or locally in
```
src/server/users.json
```
with the information about the existing users.

You can then use this information (the email and the corresponding password) to successfully sign in to Protected Dashboard.

After successful signing in, you will see the Dashboard page with exam results for the chosen user.

## Tests

This application has its tests following directory:
```
src/tests
```
To start tests, run this command:
```
npm run test
```

## Task

All requirements of the test assignment are met, namely:

- [x] This is a Single-Page Application.

- [x] When user opens the page without an authentication token, the Sign-in form gets displayed and Email/Password asked.

- [x] Upon sign in, the SPA authenticates the credentials using API. Error message appears if authentication didn't pass.

- [x] If authorization was successful, user session get created and the Dashboard gets available.

- [x] Secret data (Exam result) gets fetched from the backend API and shown on the ExamCard component.

- [x] Page refresh/reload doesn't require re-authorization (In-browser session gets reused).

- [x] User is able to log out using top-left menu. Auth token gets destroyed and user gets redirected to the authentication page.

## Tools & Technologies

In this project, I used [React](https://reactjs.org/) library for building a user interface and [Create-React-App](https://create-react-app.dev/) to start building an SPA.

The application's layout was implemented with [Material UI](https://mui.com/material-ui/getting-started/overview/) components.

For authorization I used [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library, which is an implementation of [JSON Web Tokens](https://www.rfc-editor.org/rfc/rfc7519).

[React Router](https://reactrouter.com/en/main) helped to manage the application's routes.

With [json-server](https://github.com/typicode/json-server), I was able to fake a server API for this project.

Tests were written using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

The application runs on [Node.js](https://nodejs.org/en/) environment, and [npm](https://www.npmjs.com/) manages its packages.

For strong typing of JavaScript, I used [TypeScript](https://www.typescriptlang.org/).

To maintain the quality and the uniformity of the code, I relied on the help of [eslint](https://eslint.org/).

For version control, I used [Git](https://git-scm.com/) & [GitHub](https://github.com/).
