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

    async getFiles() {
        const files = await fileOps.getFiles();
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
            let _response = await fileOps.deleteFile( fileId );
        } catch ( err ) {
            console.error( err );
        }
    }

    render() {
        const { files } = this.state;
        const totalFileSize = files.reduce( ( previousValue, currentValue ) => previousValue + currentValue.size, 0 );
        console.log('render files: ', files);
        return (
            <div>
                <div className="container container__user-input">
                    <input placeholder="Search documents..." />
                    <input type="file" onChange={this.uploadFile} />
                    <h3>{ files.length } documents</h3>
                    <h5>Total size: {totalFileSize}kB</h5>
                </div>
                <div className="container container__file-list">
                    { files.map( file => <FileBox key={file.id} file={file} deleteFile={() => this.deleteFile( file.id )} /> ) }
                </div>
            
            </div>
        );
    }
}