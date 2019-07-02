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
                {/* The src of the following img element will be a data URL, which poses security concerns */}
                {/* However, documentation on the matter asserts that scripts cannot be executed via img-src.  */}
                {/* See: https://blog.mozilla.org/security/2017/11/27/blocking-top-level-navigations-data-urls-firefox-59/ */}
                {/* See: https://security.stackexchange.com/a/167244 */}
                <img className="img--thumb" src={content} />
                <p className="text--small">{size}kB</p>
                <button type="button" onClick={() => deleteFile( id ) }>delete</button>
            </div>
        </div>
    );
}