const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//Considered GLOBAL MIDDLEWARE: must be at the top of the page to work properly
// built-in middleware parses the body for us
server.use(express.json());

//third-party middleware
//similar to built-in in that someone else wrote it for us and we can just plug it in where we need it
server.use(helmet());

//router
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;


