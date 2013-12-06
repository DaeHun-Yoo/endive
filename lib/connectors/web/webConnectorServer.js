var dnode = require( 'dnode' );
var socketio = require( 'socket.io' );
var Hash = require ( 'hashish' );
var WebConnector = require ( "./webConnector" );

var STATE_STOPPED = 0
var STATE_STARTED = 1

var WebConnectorServer = function( port ) {
    if ( !(this instanceof WebConnectorServer) )
    {
        return new WebConnectorServer();
    }
    this.port = port;
    this.server = null;
    this.anonymousClients = [];
    this.clients = {};

    this.dnodeRoomManager = [];

    this.state = STATE_STOPPED;
};

module.exports = WebConnectorServer;

WebConnectorServer.prototype.start = function()
{
    if ( this.state == STATE_STARTED )
    {
        return;
    }

    var server = this.server = socketio.listen( this.port );
    server.sockets.on( 'connection' , this.onConnection );

    this.state = STATE_STARTED;

    console.log ( 'WebConnectorServer started : ' + this.port );
};


WebConnectorServer.prototype.stop = function()
{
    if ( this.state == STATE_STOPPED )
    {
        return;
    }
    var self = this;
    this.server.server.close ( function() {
        console.log ( 'WebConnectorServer closed server : ' + self.port );
    });
    this.removeAnonymousConnectorAll();
    this.removeConnectorAll();
    this.server = null;

    this.state = STATE_STOPPED;
};

WebConnectorServer.prototype.onConnection = function( socket )
{
    console.log ( 'accepted : ' + socket );
    var connector = new WebConnector ( this , socket );
    this.anonymousClients.push ( connector );
};

WebConnectorServer.prototype.removeAnonymousConnectorAll = function()
{
    var clients = this.anonymousClients;
    var length = clients.length;
    for ( var i = 0 ; i < length ; i++ )
    {
        clients[i].close();
    }
    this.anonymousClients = [];
};

WebConnectorServer.prototype.removeConnectorAll = function()
{
    var clients = this.clients;
    Hash ( clients ).forEach ( function ( port , client ) {
        client.close();
    });
    this.clients = {};
};

WebConnectorServer.prototype.removeAnonymousConnector = function ( webConnect )
{
    var clients = this.anonymousClients;
    var length = clients.length;
    for ( var i = 0 ; i < length ; i++ )
    {
        if ( clients[i] == webConnect )
        {
            webConnect.close();
            clients.splice ( i , 1 );
            break;
        }
    }
};

WebConnectorServer.prototype.removeConnector = function ( id )
{
    delete this.clients[id];
};

WebConnectorServer.prototype.onDisconnectClient = function ( webConnector )
{
    var id = webConnector.id;
    if ( id == null )
    {
        this.removeAnonymousConnector ( webConnector );
        return;
    }
    this.removeConnector ( id );
};