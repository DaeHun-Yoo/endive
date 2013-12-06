
var fs = require( 'fs' );
var path = require( 'path' );
var async = require( 'async' );
var Hash = require( 'hashish');

var WebConnectorServer = require ( './connectors/web/webConnectorServer' );

var Application = module.exports = {};

Application.init = function( options ) {
    options = options || {};

    this.webConnectorServers = {};

};

Application.configure = function( options ) {

};

Application.start = function()
{
    this.startWebConnectorServers();
};

Application.stop = function()
{
    this.stopWebConnectorServers();
};

Application.startWebConnectorServers = function()
{
    var servers = this.webConnectorServers;
    Hash ( servers ).forEach ( function ( server , port ) {
        server.start();
    });
};

Application.stopWebConnectorServers = function()
{
    var servers = this.webConnectorServers;
    Hash ( servers ).forEach ( function ( server , port ) {
        server.stop();
    });
};

Application.setOption = function ( id , value ) {
    this.options[id] = value;
};

Application.getOption = function ( id , value ) {
    return this.options[id];
};

Application.addWebConnectorServer = function ( port ) {
    var server = new WebConnectorServer ( port );
    if ( this.webConnectorServers[port] != null )
    {
        this.webConnectorServers[port].stop();
    }

    this.webConnectorServers[port] = server;
};

Application.addRoomManagerConfig = function ( port ) {

};

Application.addRoomConfig = function ( port ) {

};