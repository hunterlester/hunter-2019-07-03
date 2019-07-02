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
        const files = await fileOps.getFiles(searchParam);
        if ( files ) {
            this.setState( { files } );
        }
    }

    uploadFile( event ) {
        const reader  = new FileReader();
        const file = event.target.files[0];

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
                    const responseFile = await fileOps.uploadFile( fileBody );
                    this.state.files.push( responseFile );
                    this.setState( { files: this.state.files } );
                } catch ( err ) {
                    console.error( err );
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
                    <input placeholder="Search documents..." onChange={( event ) => {
                        this.getFiles( event.target.value );
                    }} />
                    <input type="file" onChange={this.uploadFile} />
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