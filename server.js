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
  server.use(addName);
  //server.use(moodyGatekeeper);
  // server.use(lockout);
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
  //create custom middleware that console logs which type of request was made:
  function typeLogger(req, res, next) {
    console.log(`${req.method} = REQUEST`);
    next();
  }

  //create custom middleware that adds a name to the welcome message on the root '/':
  function addName(req, res, next) {
    req.name = req.name || "Your mom";
    next();
  }

  //create custom middleware that targets res instead of req. Shouldn't throw an error:
  function lockout(req, res, next) {
    res.status(403).json({message: 'API Lockout'})
  }

  //create custom middleware that refuses access 1/3 of the time with a 403 error and "You shall not pass" message:
  function moodyGatekeeper(req, res, next) {
    const seconds = new Date().getSeconds();

    if (seconds % 3 === 0) {
      res.status(403).json({message: "You shall not pass"});
    } else {
      next();
    }   
  }
  
module.exports = server;


