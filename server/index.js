const express = require('express');
const app = express();

const fileResourceRouter = require('./routes/files.js');

function errorHandler (err, _req, res, _next) {
    res.json( { error: err } );
}

app.use(express.static('dist'));
// url encoding middleware
app.use(errorHandler);

app.use('/files', fileResourceRouter);

app.listen(3000, () => console.log('Listening on port 3000!'));