var dnode = require( 'dnode' );
var socketio = require( 'socket.io' );
var hash = require( 'hashish' );
var net = require( 'net' );
var fs = require( 'fs' );

var DnodeConnector = require( '../connectors/dnode/dnodeConnector' );
var WebConnector = require( '../connectors/web/webConnector' );

var STATE_STOPPED = 0
var STATE_STARTED = 1

var RoomManager = function( port , config ) {
    if ( !(this instanceof RoomManager) )
    {
        return new RoomManager();
    }
    this.port = port;
    this.config = config;

    this.dnodeServer = null;
    this.dnodeRoomManagers = null;
    this.dnodeRooms = null;


    this.state = STATE_STOPPED;
};

module.exports = RoomManager;

var pt = RoomManager.prototype;

var dnodeFunctions = {

};

pt.addRemoteRoomManager = function ( id , ip , port )
{
    var d = new DnodeConnector( id , ip , port );
    this.dnodeRoomManagers.push ( d );
};

pt.start = function()
{
    if ( this.state == STATE_STARTED )
    {
        return;
    }

    var ds = this.dnodeServer = dnode ( dnodeFunctions ).listen ( this.port );
    ds.on ( 'connection' , function ( connection ) {
        console.log ( 'RoomManager accepted : ' + connection.remoteAddress + ':' + connection.remotePort );

    });

    hash ( this.dnodeRoomManagers ).forEach ( function ( dnode ) {
       dnode.start();
    });

    console.log ( 'RoomManager started : ' + this.port );
};


pt.stop = function()
{
    if ( this.state == STATE_STOPPED )
    {
        return;
    }

    this.dnodeServer.close();
    hash ( this.dnodeRoomManagers ).forEach ( function ( dnode ) {
        dnode.stop();
    });

    this.state = STATE_STOPPED;
    console.log ( 'RoomManager stopped : ' + this.port );
};

pt.onConnection = function( socket )
{
    console.log ( 'accepted : ' + socket );
    var connector = new WebConnector ( this , socket );
    this.anonymousClients.push ( connector );
};

pt.removeAnonymousConnector = function ( webConnect )
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

pt.removeConnector = function ( id )
{
    delete this.clients[id];
};

pt.onDisconnectClient = function ( webConnector )
{
    var id = webConnector.id;
    if ( id == null )
    {
        this.removeAnonymousConnector ( webConnector );
        return;
    }
    this.removeConnector ( id );
};

