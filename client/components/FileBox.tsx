import React from 'react';
import { File as FileProps } from './FileManager';

interface FileBoxProps {
    file: FileProps;
    deleteFile: ( id: string ) => void;
}

export const FileBox = ( props: FileBoxProps ) => {
    const { file, deleteFile } = props;
    const { id, name, size, content } = file;
    return (
        <div>
            <div className="container container--2col">
                <p className="text--large">{name}</p>
                <img className="img--thumb" src={content} />
                <p className="text--small">{size}kB</p>
                <button type="button" onClick={() => deleteFile( id ) }>delete</button>
            </div>
        </div>
    );
}