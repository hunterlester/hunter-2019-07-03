# Hunter - July 3rd, 2019 
## Installation
- Recommended: 
  - Node.js 10.x
  - Yarn 1.13.x
- Run `yarn`
- Run `yarn start`
## Security
- Images are stored as data URL's and passed to img-src for rendering. It is possible for a user to POST content that is not a valid data URL and which contains arbitrary data, which may or may not be malicious but will certainly break the client application
  - In production, I'd upload validated images to a CDN service, whitelist the CDN URI for image-src, then store CDN image URL's in the database, passing those CDN URL's to img-src.
  - For this exercise, the mock DB restricts uploads to valid data URL's and specific MIME types: image/png image/jpeg image/jpg, to narrow potential attack surface, however, documentation on the matter asserts that scripts cannot be executed via img-src.
    - See: https://blog.mozilla.org/security/2017/11/27/blocking-top-level-navigations-data-urls-firefox-59/
    - See: https://security.stackexchange.com/a/167244
- Adddressed
  - React handles input sanitization
  - Set server Content security policy header
- Not Addressed
  - Server API endpoints are not protected with authentication token, so any user-agent may make requests to server.
## Improvements
- Standard resource description definitions added to image files to make search more interesting for user
- User management and authentication
- File directory organization
- Lazy-loading of images so that they are only loaded when user scrolls to img elements
- Instead of directly storing images in database as data URL's, it would improve performance to upload images to a CDN service, then store a URL reference to the image   
- Go through a CSP configuration process of setting a strict policy to block all source and report-only, then analyze which origins should be whitelisted
- CSP script-src is currently `'self'`. For production, change policy to `'strict-dynamic' 'nonce-<nonce | hash>` to only allow our built JS scripts.
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
- helmet: Content security policy middleware for express

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
    type: string as accepted MIME type: image/jpeg image/jpg image/png,
    content: string as valid data URL 
}
```
- Returns single valid file resource
---
## Other notes
// Anything else you want to mention
- Personal note to study OWASP cheatsheets: https://github.com/OWASP/CheatSheetSeries/tree/master/cheatsheets