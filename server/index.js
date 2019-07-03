const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

const fileResourceRouter = require('./routes/files.js');

function errorHandler ( err, _req, res, _next ) {
    console.error('Error handler middleware: ', err);
    let error = err.message;
    if ( err.message === 'request entity too large') {
        error = "File must be less than 10MB";
    }
    res.json( { error } );
}

app.use( helmet() );
// Security: Provide separate directives configuration for NODE_ENV=production,
// as the following is inteneded for a development environment.
// Evaluate policies: https://csp-evaluator.withgoogle.com/
app.use( helmet.contentSecurityPolicy( {
  directives: {
    defaultSrc: ["'none'", "localhost:3000", "ws:", "data:"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"]
  }
} ) );
app.use( express.static( 'dist' ) );
app.use( bodyParser.json( { limit: '10mb' } ) );
app.use( bodyParser.urlencoded( { extended: false } ) );

app.use( '/files', fileResourceRouter );
app.use( errorHandler );

app.listen( 3000, () => console.log('Listening on port 3000!' ) );