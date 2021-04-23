// source in express
const express = require('express');
// source in bodyParser
const bodyParser = require('body-parser');
// source in router
const router = require('./modules/list.router');

// declare app
const app = express();

// helps to ensure that inputs do not come back as undefined
app.use(bodyParser.urlencoded({ extended: true }));

// /todo -> correct router
app.use('/todo', router);

// server back static files by default
app.use(express.static('server/public'));

// start listening for requests on a specific PORT
// setting up as env because i know i will eventually deploy to heroku..
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
