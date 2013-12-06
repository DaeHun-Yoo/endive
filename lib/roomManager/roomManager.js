var dnode = require( 'dnode' );
var socketio = require( 'socket.io' );
var net = require( 'net' );

var DnodeConnector = require( '../connectors/dnode/dnodeConnector' );
var WebConnector = require( '../connectors/web/webConnector' );

var STATE_STOPPED = 0
var STATE_STARTED = 1

var RoomManager = function( port ) {
    if ( !(this instanceof RoomManager) )
    {
        return new RoomManager();
    }
    this.port = port;
    this.dnodeServer = null;
    this.dnodeRoomManagers = null;
    this.dnodeRooms = null;
    this.dnodeRooms = null;

    this.state = STATE_STOPPED;
};

module.exports = RoomManager;

var pt = RoomManager.prototype;

var dnodeFunctions = {

};

pt.addRoomManagerInfo = function ( ip , port )
{
    var d = new DnodeConnector( null , ip , port );
    this.dnodeRoomManager.push ( d );
};

pt.start = function()
{
    if ( this.state == STATE_STARTED )
    {
        return;
    }

    this.dnode = dnode ( dnodeObject );
    console.log ( 'RoomManager started : ' + this.port );
};


WebConnectorServer.prototype.stop = function()
{
    if ( this.state == STATE_STOPPED )
    {
        return;
    }


    this.state = STATE_STOPPED;
};

WebConnectorServer.prototype.onConnection = function( socket )
{
    console.log ( 'accepted : ' + socket );
    var connector = new WebConnector ( this , socket );
    this.anonymousClients.push ( connector );
};

WebConnectorServer.prototype.removeAnonymousConnector = function ( webConnect )
{
    var clients = this.anonymousClients;
    var length = clients.length;
    for ( var i = 0 ; i < length ; i++ )
    {
        if ( clients[i] == webConnect )
        {
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