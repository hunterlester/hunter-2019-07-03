# Hunter - July 3rd, 2019 
## Installation
- Recommended: 
  - Node.js 10.x
  - Yarn 1.13.x
- Run `yarn`
- Run `yarn start`
## Security
- Adddressed
  - React handles input sanitization
  - Content security policy
- Not Addressed
  - Server API endpoints are not protected with authentication token.
## Improvements
- Standard resource description definitions added to image files to make search more interesting for user
- User management and authentication
- 
## Libraries

- sass: Added by ParcelJS to support scss files
- @babel/core: Added by ParcelJS to expose Babel transform API
- react-hot-loader: For enabling hot module replacement to speed up development time
- parcel-bundler: Notice the lack of webpack config files. ParcelJS handles nearly all build configurations.
- nodemon: For watching server-side scripts
- concurrently: To run server-side and client-side watch commands simultaneously, as they don't return, so `command1 && command2` is not possible.
- typescript: TypeScript support
- body-parser: Express middleware to handle parsing of JSON and URL-encoded data
- express: server
- react: client view
- react-dom: Allows React components to be mounted on the document object model

- Dependencies primarily for testing React components, especially for TypeScript to recognize undeclared types while running tests:
     - @babel/preset-env
     - @babel/preset-react
     - @babel/preset-typescript
     - @types/jest
     - @types/node
     - @types/react
     - @types/webpack-env
     - enzyme
     - enzyme-adapter-react-16
     - jest
## API
// Any general observation about the API?
### GET `/files?search=<string>`
- Requests all file resources from database
- Optionally accepts a query parameter to search and return matching file names
- Returns array of files

### DELETE `/files/:id`
- Requests single resource deletion
- Accepts file ID parameter
- Returns 200 code on success

### POST `/files`
- Adds single file resource to database
- Request body is in JSON format where file conforms to:
```
{
    name: string,
    size: number,
    type: string,
    content: string | ArrayBuffer
}
```
- Returns single valid file resource
---
## Other notes
// Anything else you want to mention