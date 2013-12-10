
var fs = require( 'fs' )
  , path = require( 'path' )
  , async = require( 'async' )
  , Hash = require( 'hashish')
  , util = require( './util/utils')
  , appUtils = require( './util/appUtils' )
  , Constants = require( './util/constants' )
  , ConnectorServer = require ( './connectors/web/connectorServer' )
  , RoomManager = require ( './roomManager/roomManager' )
  , RoomServer = require ( './roomServer/roomServer' );

var STATE_NONE          = 0;
var STATE_INITIALIZED   = 1;
var STATE_STARTED       = 2;
var STATE_STOPPED       = 3;

var Application = module.exports = { state: STATE_NONE };

Application.init = function( options )
{
    this.options = options || {};
    this.configs = {};
    this.connectorServers = {};
    this.roomManagers = {};
    this.roomServers = {};

    this.state = STATE_INITIALIZED;
};

Application.configure = function( options ) {

};


Application.start = function()
{
    console.log ( 'Operation Mode: ' + this.getOperationMode() + '\n' );

    if ( this.isUseConfigFile() )
    {
        appUtils.loadConfiguration( this );
    }
    this.startServers();
};

Application.startServers = function()
{
    this.startServersWith ( this.connectorServers );
    this.startServersWith ( this.roomManagers );
    this.startServersWith ( this.roomServers );
};

Application.stop = function()
{
    this.stopServers();
    this.reset();
};

Application.stopServers = function()
{
    this.stopServersWith ( this.connectorServers );
    this.stopServersWith ( this.roomManagers );
    this.stopServersWith ( this.roomServers );
};

Application.reset = function()
{
    this.connectorServers = {};
    this.roomManagers = {};
    this.roomServers = {};
};

Application.startServersWith = function ( servers )
{
    if ( servers == null ) return;
    Hash ( servers ).forEach ( function ( server , port ) {
        server.start();
    });
};

Application.stopServersWith = function ( servers )
{
    if ( servers == null ) return;
    Hash ( servers ).forEach ( function ( server , port ) {
        server.stop();
    });
};

Application.getBase = function()
{
    return this.getOption ( Constants.Options.BASE ) || process.cwd();
};

Application.setOption = function ( id , value )
{
    this.options[id] = value;
};

Application.getOption = function ( id )
{
    return this.options[id];
};

Application.setConfig = function ( id , value )
{
    this.configs[id] = value;
};

Application.getConfig = function ( id )
{
    return this.configs[id];
};

Application.isDebugMode = function()
{
    return (this.getOperationMode() === Constants.Word.DEBUG_MODE);
};

Application.getOperationMode = function()
{
    var mode = this.options[Constants.Options.OPERATION_MODE];
    if ( mode == null )
    {
        return Constants.Mode.RELEASE;
    }
    return mode;

};

Application.isUseConfigFile = function()
{
    var useConfigFile = this.options[Constants.Options.USE_CONFIGE_FILE];
    if ( useConfigFile == null )
    {
        return true;
    }
    return useConfigFile;
};

Application.getConfigByMode = function ( config )
{
    if ( config == null ) return null;

    var mode = this.getOperationMode();
    return config[mode];
}

Application.setConfig = function ( id , config )
{
    var list = this.getConfigByMode( config );
    if ( list == null || list.length == 0 )
    {
        return;
    }
    this.setConfig( id , list );

    var ips = util.getLocalIPs();
    var servers = util.filterObjectsFromArray ( ips , list , 'host' );

    var length = servers.length;
    for ( var i = 0 ; i < length ; i++ )
    {
        this.addServer ( id , servers[i] );
    }

};

Application.addServer = function ( id , info )
{
    switch( id )
    {
        case Constants.Config.CONNECTOR:        this.addConnectorServer ( info.id , info.port );  break;
        case Constants.Config.ROOM_MANAGER:     this.addRoomManager ( info.id , info.port );  break;
        case Constants.Config.ROOM_SERVER:      this.addRoomServer ( info.id , info.port );  break;
        case Constants.Config.MASTER:           this.addMaster ( info.id , info.port );  break;
    }
};

Application.addConnectorServer = function ( serverId , port )
{
    var server = new ConnectorServer ( serverId , port );
    if ( this.connectorServers[port] != null )
    {
        this.connectorServers[port].stop();
    }

    this.connectorServers[port] = server;
};

Application.addRoomManager = function ( serverId , port )
{
    var server = new RoomManager ( serverId , port );
    if ( this.roomManagers[port] != null )
    {
        this.roomManagers[port].stop();
    }

    this.roomManagers[port] = server;

};

Application.addRoomServer = function ( serverId , port )
{

};

Application.addMaster = function ( serverId , port )
{

};