import React, { Component } from 'react';
import { FileBox } from './FileBox';
import * as fileOps from '../asyncOps';

export interface File {
    id: string,
    name: string,
    size: number,
    type: string,
    content: string | ArrayBuffer,
}

interface FileManagerState {
    files: Array<File>,
}

export class FileManager extends Component<any, FileManagerState> {
    constructor( props ) {
        super( props );
        this.state = { files: [] };
        this.deleteFile = this.deleteFile.bind( this );
        this.uploadFile = this.uploadFile.bind( this );
        this.getFiles = this.getFiles.bind( this );
    }

    componentDidMount() {
        this.getFiles();
    }

    async getFiles( searchParam?: string ) {
        const { files } = this.state;
        try {
            const filesArray = await fileOps.getFiles(searchParam);
            if ( filesArray ) {
                this.setState( { files: filesArray } );
            } else {
                this.setState( { files } );
            }
        } catch( err ) {
            console.error( err );
        }
    }

    uploadFile( event ) {
        event.persist();
        const reader  = new FileReader();
        const file = event.target.files[0];
        if ( !file ) return;
        const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        const isAccecptableFileType = acceptedFileTypes.some( ( type ) => file.type === type );
        if ( !isAccecptableFileType ) {
            alert( "Please choose either JPG or PNG images for upload" );
            event.target.value = null;
            return;
        }

        if ( file ) {
            reader.addEventListener("load", async () => {
                const { name, size, type } = file;
                const fileBody = {
                    name,
                    size,
                    type,
                    content: reader.result,
                    id: null
                }
                try {
                    const response = await fileOps.uploadFile( fileBody );
                    if ( response.error ) {
                        alert( response.error );
                        event.target.value = null;
                        return;
                    }
                    this.state.files.push( response );
                    this.setState( { files: this.state.files } );
                    event.target.value = null;
                } catch ( err ) {
                    console.error( err );
                    event.target.value = null;
                    alert( err );
                }
            });
            reader.readAsDataURL(file);
        }
    }

    async deleteFile( fileId ) {
        try {
            let response = await fileOps.deleteFile( fileId );
            if ( response && response.ok ) {
                const files = this.state.files.filter( file => file.id !== fileId );
                this.setState({ files });
            }
        } catch ( err ) {
            console.error( err );
        }
    }

    render() {
        const { files } = this.state;
        const totalFileSize = files.reduce( ( previousValue, currentValue ) => previousValue + currentValue.size, 0 );
        return (
            <div>
                <div className="container container--2col container--2col-iphone">
                    {/* Security: https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks */}
                    <input className="search" accept="image/png,image/jpg,image/jpeg" placeholder="Search documents..." onChange={( event ) => {
                        this.getFiles( event.target.value );
                    }} />
                    {/* Security: Read about attack vectors associated with file uploads */}
                    <input type="file" onChange={( event ) => { this.uploadFile( event ); } } />
                    <p className="text--x-large text--no-margin">{ files.length } documents</p>
                    <p className="text--medium text--no-margin text--right-desktop">Total size: {totalFileSize}kB</p>
                </div>
                <div className="container container--3col">
                    { files.map( file => <FileBox key={file.id} file={file} deleteFile={() => this.deleteFile( file.id )} /> ) }
                </div>
            
            </div>
        );
    }
}