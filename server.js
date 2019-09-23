const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');
const logger = require('morgan');
const server = express();

//Considered GLOBAL MIDDLEWARE: must be at the top of the page to work properly
// built-in middleware parses the body for us
  server.use(express.json());

//third-party middleware
  //similar to built-in in that someone else wrote it for us and we can just plug it in where we need it
  //helmet protects headers from security breeches
  server.use(helmet());

  //morgan is a logger, shows messages in the server terminal about what your api requests are doing (less console.log'ing needed)
  server.use(logger('dev'));

//custom middleware
  //practice building our own middleware with one that logs request type for us
  //understanding the importance of "next"
  server.use(typeLogger);

//router
  server.use('/api/hubs', hubsRouter);








server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});


//best practice to declare custom middleware at the bottom
function typeLogger(req, res, next) {
  console.log(`${req.method} = REQUEST`);
  next();
}
module.exports = server;


