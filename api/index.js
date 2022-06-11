const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

apiRouter.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message
    });
  });
  
  module.exports = apiRouter;

  apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
  
    next();
  });

  server.get('/background/:color', (req, res, next) => {
    res.send(`
      <body style="background: ${ req.params.color };">
        <h1>Hi World</h1>
      </body>
    `);
  });
  server.get('/add/:first/to/:second', (req, res, next) => {
    res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
      Number(req.params.first) + Number(req.params.second)
     }</h1>`);
  });
  