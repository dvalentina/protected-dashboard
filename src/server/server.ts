import cors, { CorsOptions } from 'cors';
import fs from 'fs';
import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';

import { AuthForm, IToken, User } from '../types';

const server = jsonServer.create();
const router = jsonServer.router('./src/server/db.json');

const userdb = JSON.parse(fs.readFileSync('./src/server/users.json', 'UTF-8' as BufferEncoding));

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

const domainList = ['http://localhost:3000', 'http://localhost'];

const corsConfig: CorsOptions = {
  origin(origin, callback) {
    console.log('ORIGIN', origin);

    if (origin && domainList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

server.use(cors(corsConfig));

const SECRET_KEY = '123456789';
const expiresIn = '1h';

// Create a token from a payload
function createToken(payload: AuthForm) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (decode !== undefined) return decode as IToken;

    return err;
  });
}

function findUserId({ email, password }: AuthForm) {
  return userdb.users.findIndex((user: User) => user.email === email && user.password === password);
}

server.post('/auth/', (req, res) => {
  const { email, password } = req.body;

  const userId = findUserId({ email, password });

  if (userId === -1) {
    const status = 401;

    const message = 'Incorrect email or password';

    res.status(status).json({ status, message });

    return;
  }

  const accessToken = createToken({ email, password });

  res.status(200).json({ accessToken, userId });
});

server.get('/users/me/', (req, res) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    return;
  }

  const { email, password } = verifyToken(req.headers.authorization.split(' ')[1]) as unknown as IToken;
  const userId = findUserId({ email, password });

  if (userId === -1) {
    const status = 404;

    const message = 'User not found, try signing in again';

    res.status(status).json({ status, message });

    return;
  }

  res.status(200).json({ userId });
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
