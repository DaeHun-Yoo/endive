
var fs = require( 'fs' );
var path = require( 'path' );
var application = require( './application' );

var Endive = module.exports = createApplication;

var HOME = process.cwd();

var WEB_CONNECTOR_SERVER_CONFIG = path.resolve( HOME , 'config/webConnectorServer.json' );
var ROOM_MANAGER_CONFIG = path.resolve( HOME , 'config/roomManager.json' );
var ROOM_SERVER_CONFIG = path.resolve( HOME , 'config/roomServer.json' );

Endive.version = '0.1';

Endive.components = {};

Endive.filters = {};

var self = this;

function createApplication( options ) {
    var app = application;
    app.init( options );
    self.app = app;
    return app;
}

Object.defineProperty( Endive , 'app' , {
    get: function() {
        return self.app;
    }
})