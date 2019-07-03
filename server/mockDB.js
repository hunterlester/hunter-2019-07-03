class FileContext {
    constructor(fileMeta) {
        if ( !fileMeta ) {
            throw new Error( "Please pass file context object.");
        }

        const { name, size, type, content } = fileMeta;

        try {
            this._fileMeta = {
                id: Math.random().toString(32).substring(2),
                name,
                size,
                type,
                content
            };
        } catch ( err ) {
            throw err;
        }

        const standardProperties = ["id", "name", "size", "type", "content"];

        const hasAllProperties = standardProperties.every( key => Object.prototype.hasOwnProperty.call( this._fileMeta, key ) &&  this._fileMeta[key] );
        if ( !hasAllProperties ) {
            throw new Error( "Meta file object must have properties: 'name', 'size', 'type', 'content'" );
        }

        const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        const isAccecptableFileType = acceptedFileTypes.some( ( mimeType ) => type === mimeType );
        if ( !isAccecptableFileType ) {
            throw new Error( "File does not conform to MIME types: image/png, image/jpeg, image/jpg" );
        }

        // Security: Validates data URL strings and only allows image/jpeg, image/jpg, or image/png MIME types.
        // I did not construct this regular expression. I made a minor modification to only allow specfied MIME types.
        // Credit due to: https://www.npmjs.com/package/valid-data-url
        const validDataUrlRegex = new RegExp(/^data:(image\/(jpe?g|png))(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)$/, 'i');
        if ( !validDataUrlRegex.test( content ) ) {
            throw new Error( "File content must be valid data URL and be one of the following MIME types: image/png, image/jpeg, image/jpg" );
        }

        // TODO: Should also validate value type, in addition to object-literal keys
    }

    get fileMeta() {
        return this._fileMeta;
    }

    get id() {
        return this._fileMeta.id;
    }
}

class MockFileDB {
    constructor() {
        this._fileCache = {};
    }

    post( fileData ) {
      return new Promise( ( resolve, reject ) => {
          try {
              const fileContextIntstance = new FileContext( fileData );
              this._fileCache[fileContextIntstance.id] = fileContextIntstance;
              resolve( fileContextIntstance.fileMeta );
          } catch ( err ) {
              reject( err );
          }
      } );
    }

    delete( fileId ) {
        return new Promise( ( resolve, reject ) => {
            if ( this._fileCache[fileId] ) {
                // Delete operation will return true even when called on key/value which does not exist.
                delete this._fileCache[fileId];
                this._fileCache = { ...this._fileCache };
                resolve( );
            } else {
                reject( Error( "Unsuccessful delete because resource does not exist." ) );
            }
        } );
    }

    get( searchParams ) {
        return new Promise( ( resolve, reject ) => {
            if ( searchParams !== undefined ) {
                try {
                    const filteredFiles = Object.values( this._fileCache )
                        .filter( file => file.fileMeta.name.toLowerCase().includes( searchParams ) )
                        .map( file => file.fileMeta );

                    resolve( filteredFiles );
                } catch ( err ) {
                    reject( err );
                }
            } else {
                try {
                    const files = Object.values( this._fileCache ).map( file => file.fileMeta );
                    resolve( files );
                } catch( err ) {
                    reject( err );
                }
            }
        } );
    } 
}

module.exports = MockFileDB;