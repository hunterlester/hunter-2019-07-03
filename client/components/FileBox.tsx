import React, { Component } from 'react';
import { File as FileProps } from './FileManager';

interface FileBoxProps {
    file: FileProps;
    deleteFile: ( id: string ) => void;
}

export class FileBox extends Component<FileBoxProps> {
    constructor(props) {
       super(props); 
    }

    render() {
        const { file, deleteFile } = this.props;
        const { id, name, size, type, content } = file;
        return (
            <div>
                <p>{name}</p>
                <div className="container">
                    <p>{size}kB</p>
                    <button type="button" onClick={() => deleteFile( id ) }>delete</button>
                    <img src={content} />
                </div>
            </div>
        );
    }
}