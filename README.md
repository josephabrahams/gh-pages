# example.com

## Installation

    $ bundle install

    $ npm install

    $ bower install


## Local Development

Build Jekyll into `_site`:

    $ grunt build

Build Jekyll and run [htmlproofer](https://github.com/gjtorikian/html-proofer) on `_site`:

    $ grunt test

Serve `_site` at <http://localhost:8000>, livereload expanded sass changes, rebuild Jekyll as needed:

    $ grunt serve

Parse `_sass`, `css`, and `js` for [Modernizr](http://modernizr.com/) references and build to `js/lib/modernizr.min.js`.

    $ grunt modernizr

