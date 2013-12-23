var dnode = require( 'dnode' );
var socketio = require( 'socket.io' );
var Hash = require( 'hashish' );
var net = require( 'net' );
var fs = require( 'fs' );

var util = require ( '../util/utils');
var DNodeServer = require( '../connectors/dnode/dnodeServer' );
var DNodeConnector = require( '../connectors/dnode/dnodeConnector' );
var Connector = require( '../connectors/web/connector' );

var STATE_STOPPED = 0
var STATE_STARTED = 1

var RoomManager = function ( id , port , config ) {
    if ( !(this instanceof RoomManager) ) {
        return new RoomManager();
    }
    this.id = id;
    this.port = port;
    this.config = config;

    this.dnodeServer = new DNodeServer( this.id , this.port );
    this.dnodeRoomManagers = {};
    this.dnodeRooms = {};

    this.state = STATE_STOPPED;
};

module.exports = RoomManager;


RoomManager.prototype.addRemoteRoomManager = function ( id , ip , port ) {
    var d = new DNodeConnector( id , ip , port );
    this.dnodeRoomManagers[id] = d;
};

RoomManager.prototype.start = function () {
    if ( this.state == STATE_STARTED ) {
        return;
    }

    this.dnodeServer.start ( this.rpcObject );
    Hash( this.dnodeRoomManagers ).forEach( function ( dnode , id ) {
        dnode.start();
    });

    this.state = STATE_STARTED;
    console.log( 'RoomManager started : ' + this.port );
};

RoomManager.prototype.stop = function () {
    if ( this.state == STATE_STOPPED ) {
        return;
    }

    this.dnodeServer.stop();
    Hash( this.dnodeRoomManagers ).forEach( function ( dnode , id ) {
        dnode.stop();
    } );

    this.state = STATE_STOPPED;
    util.log( '[%s] RoomManager stopped : %d' , this.id , this.port );
};

RoomManager.prototype.onConnection = function ( socket ) {
    util.log( '[%s] accepted : ' + socket );
    var connector = new Connector( this , socket );
    this.anonymousClients.push( connector );
};

RoomManager.prototype.removeAnonymousConnector = function ( connector ) {
    var clients = this.anonymousClients;
    var length = clients.length;
    for ( var i = 0 ; i < length ; i++ ) {
        if ( clients[i] == connector ) {
            clients.splice( i , 1 );
            break;
        }
    }
};

RoomManager.prototype.removeConnector = function ( id ) {
    delete this.clients[id];
};

RoomManager.prototype.onDisconnectClient = function ( connector ) {
    var id = connector.id;
    if ( id == null ) {
        this.removeAnonymousConnector( connector );
        return;
    }
    this.removeConnector( id );
};

RoomManager.prototype.rpcObject = {
    getId: function( cb ) {
        cb ( this.id );
    }
};