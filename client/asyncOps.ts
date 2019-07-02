import { File } from './components/FileManager'; 

const URL = 'http://localhost:3000/files/';
const REQUEST = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-store',
    credentials: 'omit',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'error',
    referrer: 'no-referrer'
};

export const deleteFile = async ( id: string ) => {
    const response = await fetch( URL + id, {...REQUEST, method: 'DELETE' } as RequestInit );
    return response;
};

export const uploadFile = async ( file: File ) => {
    // Find alternative to JSON to stringify in order to properly sanitize request data
    const response = await fetch( URL, {
        ...REQUEST,
        method: 'POST',
        body: JSON.stringify(file),
        headers: {
            'Content-Type': 'application/json'
        }
    } as RequestInit );
    return response.json();
};

export const getFiles = async ( ) => {
    try {
        const response = await fetch( URL, { ...REQUEST } as RequestInit );
        return response.json();
    } catch ( err ) {
        console.error( err );
        return;
    }
};