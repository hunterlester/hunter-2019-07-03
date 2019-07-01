const express = require('express');
const router = express.Router();
const MockFileDB = require('../mockDB');
const fileDb = new MockFileDB();

// Gets all file resources
router.get('/', async ( req, res, next ) => {
    // handle search queries here
    // Be sure to safely handle search queries as they are user input
    try {
        const files = await fileDb.get( req.query.search );
        res.json( files );
    } catch ( err ) {
        next( err );
    }
});

// Potential PATCH route to update meta file properties? Useful for resource description.

// Posts file resource
// Allow posting of multiple file resources?
router.post('/', async ( req, res, next ) => {
    try {
        const file = await fileDb.post( req.body );
        res.json( file );
    } catch ( err ) {
        next( err );
    }
});

// Deletes file resource
router.delete('/:fileId', async ( req, res, next ) => {
    try {
        await fileDb.delete( req.params.fileId );
        res.sendStatus( 200 );
    } catch ( err ) {
        next( err );
    }
});

module.exports = router;