class File {
    constructor(fileMeta) {
        if ( !fileMeta ) {
            throw new Error( "Please pass meta file object");
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
        // Should also validate value type 

    }

    get id() {
        return this._fileMeta.id;
    }

    get name() {
        return this._fileMeta.name;
    }

    get size() {
        return this._fileMeta.size;
    }

    get type() {
        return this._fileMeta.type;
    }

    get content() {
        return this._fileMeta.content;
    }
}

class MockFileDB {
    constructor() {
        this._fileCache = {};
    }

    // validate file object structure
    post(file) {
      return new Promise( ( resolve, reject ) => {
          if ( this._fileCache[fileId] ) {
              // Do I want to allow posting on an already existing resource?
              reject( Error( "Unsuccessful post because resource already exists." ) );
          } else {
              try {
                  const fileMeta = new File(file);
                  this._fileCache[fileMeta.id] = fileMeta;
                  resolve( fileMeta );
              } catch ( err ) {
                  reject( err );
              }
          }
      } );
    }

    delete(fileId) {
        return new Promise( ( resolve, reject ) => {
            if ( this._fileCache[fileId] ) {
                // Delete operation will return true even when called on key/value which does not exist
                delete this._fileCache[fileId];
                this._fileCache = { ...this._fileCache };
                resolve( );
            } else {
                reject( Error( "Unsuccessful delete because resource does not exist." ) );
            }
        } );
    }

    get(searchParams) {
        return new Promise( ( resolve, reject ) => {
            if ( searchParams ) {
                try {
                    const filteredFiles = Object.values( this._fileCache ).filter( file => file.name.includes( searchParams ) );
                    resolve( filteredFiles );
                } catch ( err ) {
                    reject( err );
                }
            } else {
                try {
                    const files = Object.values( this._fileCache );
                    resolve( files );
                } catch( err ) {
                    reject( err );
                }
            }
        } );
    } 
}

module.exports = MockFileDB;