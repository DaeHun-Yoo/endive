var dnode = require( 'dnode' );
var socketio = require( 'socket.io' );
var Hash = require ( 'hashish' );
var WebConnector = require ( "./connector" );

var STATE_STOPPED = 0
var STATE_STARTED = 1

var ConnectorServer = function( id , port )
{
    if ( !(this instanceof ConnectorServer) )
    {
        return new ConnectorServer();
    }
    this.id         = id;
    this.port       = port;
    this.server     = null;
    this.clients    = {};

    this.state      = STATE_STOPPED;

    this.anonymousClients = [];
    this.dnodeRoomManager = [];

};

module.exports = ConnectorServer;

ConnectorServer.prototype.start = function()
{
    if ( this.state == STATE_STARTED )
    {
        return;
    }

    var server = this.server = socketio.listen( this.port );
    server.sockets.on( 'connection' , this.onConnection );

    this.state = STATE_STARTED;

    console.log ( 'ConnectorServer started : ' + this.port );
};


ConnectorServer.prototype.stop = function()
{
    if ( this.state == STATE_STOPPED )
    {
        return;
    }
    var self = this;
    this.server.server.close ( function() {
        console.log ( 'ConnectorServer closed : ' + self.port );
    });
    this.removeAnonymousConnectorAll();
    this.removeConnectorAll();
    this.server = null;

    this.state = STATE_STOPPED;
};

ConnectorServer.prototype.onConnection = function( socket )
{
    console.log ( 'accepted : ' + socket );
    var connector = new WebConnector ( this , socket );
    this.anonymousClients.push ( connector );
};

ConnectorServer.prototype.removeAnonymousConnectorAll = function()
{
    var clients = this.anonymousClients;
    var length = clients.length;
    for ( var i = 0 ; i < length ; i++ )
    {
        clients[i].close();
    }
    this.anonymousClients = [];
};

ConnectorServer.prototype.removeConnectorAll = function()
{
    var clients = this.clients;
    Hash ( clients ).forEach ( function ( port , client ) {
        client.close();
    });
    this.clients = {};
};

ConnectorServer.prototype.removeAnonymousConnector = function ( webConnect )
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

ConnectorServer.prototype.removeConnector = function ( id )
{
    delete this.clients[id];
};

ConnectorServer.prototype.onDisconnectClient = function ( webConnector )
{
    var id = webConnector.id;
    if ( id == null )
    {
        this.removeAnonymousConnector ( webConnector );
        return;
    }
    this.removeConnector ( id );
};