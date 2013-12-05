
var fs = require( 'fs' );
var path = require( 'path' );
var application = require( './application' );

var Endive = module.exports = {};

Endive.version = '0.1';

Endive.components = {};

Endive.filters = {};

var self = this;

Endive.createApp = function( options ) {
    var app = application;
    app.init( options );
    self.app = app;
    return app;
}

Object.defineProperty ( Endive , 'app' , {
    get: function() {
        return self.app;
    }
})