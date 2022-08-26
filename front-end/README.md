# Protected Dashboard

This project is a test task for a JS developer.

## Getting started

Clone this repository to your computer.\
In the project directory, run:

```
cd frontend
npm i
npm run start
```

## About

All requirements of the test task are met, namely:

:white_check_mark: This is a Single-Page Application.

:white_check_mark: When user opens the page without authentication token, the Sign-in form gets displayed and Email/Password asked.

:white_check_mark: Upon sign in, the SPA authenticates the credentials using API. Error message appears if authentication didn't pass.

:white_check_mark: If authorization was successful, user session get created and the Dashboard gets available.

:white_check_mark: Secret data (Exam result) gets fetched from the backend API and shown on the ExamCard component.

:white_check_mark: Page refresh/reload doesn't require re-authorization (In-browser session gets reused).

:white_check_mark: User is able to log out using top-left menu. Auth token gets destroyed and user gets redirected to the authentication page.

## Tools & Technologies

In this project, I used [React](https://reactjs.org/) library for building a user interface and [Create-React-App](https://create-react-app.dev/) to start building an SPA.

For authorization I used [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library, which is an implementation of [JSON Web Tokes](https://www.rfc-editor.org/rfc/rfc7519).

For server API mocking I used [json-server](https://github.com/typicode/json-server).


