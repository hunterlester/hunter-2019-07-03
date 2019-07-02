const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const fileResourceRouter = require('./routes/files.js');

function errorHandler (err, _req, res, _next) {
    console.error('errorHandler: ', err);
    res.json( { error: err } );
}

app.use(express.static('dist'));
app.use(bodyParser.json());
// TODO: url encoding middleware, research options
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler);

app.use('/files', fileResourceRouter);

app.listen(3000, () => console.log('Listening on port 3000!'));