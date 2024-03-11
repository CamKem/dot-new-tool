# dot-new-tool

Inspired by Tim Bennetto's dm.new tool, this is a web-based tool to help you create a dot new project, to handle redirects, to offer a an interface for the dot new domains.

## Features

Built with Nuxt.js, this project includes the following features:
- Create a new link with a custom name
- Redirect to the link
- Backed with a sqlite database
- All validation and error handling is accounted for

## Build Setup

```bash
# install dependencies
$ npm install

# Change URL's in files for your scope
- Change the redirect url in redirect/[slug].js to suit your needs
- Also change to url to your domain in the create.js file

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
