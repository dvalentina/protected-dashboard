// import bodyParser from 'body-parser';
import fs from 'fs';
import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';

import { AuthForm, User } from '../types';

const server = jsonServer.create();
const router = jsonServer.router('./src/server/db.json');

const userdb = JSON.parse(fs.readFileSync('./src/server/users.json', 'UTF-8' as BufferEncoding));

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

const SECRET_KEY = '123456789';
const expiresIn = '1h';

// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());

// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: true });

// Create a token from a payload
function createToken(payload: AuthForm) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (decode !== undefined) return decode;

    return err;
  });
}

function userExists({ email, password }: AuthForm) {
  return userdb.users.findIndex((user: User) => user.email === email && user.password === password) !== -1;
}

server.post('/auth/', (req, res) => {
  const { email, password } = req.body;

  if (userExists({ email, password }) === false) {
    const status = 401;

    const message = 'Incorrect email or password';

    res.status(status).json({ status, message });

    return;
  }

  const accessToken = createToken({ email, password });

  res.status(200).json({ accessToken });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Bad authorization header';

    res.status(status).json({ status, message });

    return;
  }

  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;

    const message = 'Error: access_token is not valid';

    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log('Run Auth API Server');
});
