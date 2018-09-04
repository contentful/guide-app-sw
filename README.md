
# Deprecation notice
 
This repository is deprecated and no further maintenance is planned. For an React example, please see https://github.com/contentful/gallery-app-react


guide-app-sw
=========

A generic guide app for shop guides

**This is a project created on an internal hackathon as an example of how to use Contentful and React.js. It's not officially supported, so if you find issues or have questions you can let us know via issues but don't expect a quick and prompt response.**

**This is loosely based on an [another version](https://github.com/contentful/guide-app) of this app created at a previous
hackathon**

A [React.js](http://facebook.github.io/react/) based app, using [Contentful](https://www.contentful.com/) as a data storage. Renders from
the server on initial load and it renders on the client on subsequent
loads, making use of [react-router-component](andreypopp.viewdocs.io/react-router-component).

See the [Contentful Developer Documentation](https://www.contentful.com/developers) to learn more about the API.

The app is built according to the [Flux architecture](https://facebook.github.io/flux/) using [RefluxJS](https://github.com/spoike/refluxjs).

It makes heavy use of ES6 features using [Babel](https://babeljs.io/).

The app also makes use of [Service Worker](http://jakearchibald.com/2014/using-serviceworker-today/) to persist assets locally and allow for offline usage.

However, before the features below are completed we can't really enjoy
the full potential of the possibilities SW gives us.

# TODO

These features are in progress but hampered by an issue on the
Contentful client library which we will fix soon:

* Add sync via the Contentful sync api
* Persist synced data to PouchDB

Also:
* Add live demo
* More styling and functionality
* Write an in depth blog post about how the app is structured

# Usage

Install with

```
npm install
```

Afterwards, copy `config.json.default` to `config.json`.

Build assets with

```
make all
```

Run with

```
node server.js
```

or

```
nodemon server.js
```

and visit [http://localhost:6001](http://localhost:6001)

# Using it with your own data

The credentials provided above in config.json are read only and they allow you to access data from a demo Space. If you want to create your own data, you should get a Contentful account and then get a Content Delivery API key from the API section.

# The content structure

This app uses only one content type. It looks like this:

```json
{
  "sys": {
    ...
  },
  "name": "Location",
  "displayField": "name"
  "fields": [
    {
      "name": "Name",
      "id": "name",
      "type": "Text"
    },
    {
      "name": "Type",
      "id": "type",
      "type": "Text"
    },
    {
      "name": "Address",
      "id": "address",
      "type": "Location"
    },
    {
      "name": "Phone number",
      "id": "phoneNumber",
      "type": "Symbol"
    },
    {
      "name": "Email",
      "id": "email",
      "type": "Symbol"
    },
    {
      "name": "URL",
      "id": "url",
      "type": "Symbol"
    },
    {
      "name": "Opening times",
      "id": "openingTimes",
      "type": "Text"
    },
    {
      "name": "Description",
      "id": "description",
      "type": "Text"
    },
    {
      "name": "Rating",
      "id": "rating",
      "type": "Integer"
    },
    {
      "name": "Pictures",
      "id": "pictures",
      "type": "Array",
      "items": {
        "type": "Link",
        "linkType": "Asset",
        "validations": [
          {
            "linkMimetypeGroup": "image"
          }
        ]
      }
    }
  ]
}
```
