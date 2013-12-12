var dnode = require( "dnode" );
var socketio = require( "socket.io" );

var Connector = function ( server , socket ) {

    this.id = null;
    this.server = server;
    this.socket = socket;

    socket.on( 'disconnect' , this.onDisconnect );
};

module.exports = Connector;

Connector.prototype.close = function () {
    this.socket.destroy();
    this.server = null;
}

Connector.prototype.onDisconnect = function () {
    console.log( 'disconnected : ' + this.id );
    server.onDisconnectClient( this );
};