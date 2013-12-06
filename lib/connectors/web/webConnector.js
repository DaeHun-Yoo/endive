var dnode = require( "dnode" );
var socketio = require( "socket.io" );

var WebConnector = function( server , socket )
{
    this.id     = null;
    this.server = server;
    this.socket = socket;

    socket.on( 'disconnect' , this.onDisconnect );
};

module.exports = WebConnector;

var pt = WebConnector.prototype;

pt.close = function()
{
    this.socket.destroy();
    this.server = null;
}

pt.onDisconnect = function()
{
    console.log( 'disconnected : ' + this.id );
    server.onDisconnectClient ( this );
};