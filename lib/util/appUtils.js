
var fs = require( 'fs' );
var util = require( './utils' );
var Constants = require( './constants' );

module.exports.loadConfiguration = function( app )
{
    var configConnectors = readConfigFile( app , Constants.ConfigFilePath.CONNECTORS );
    var configRoomManagers = readConfigFile( app , Constants.ConfigFilePath.ROOM_MANAGERS );
    var configRoomServers = readConfigFile( app , Constants.ConfigFilePath.ROOM_SERVERS );

    if ( configConnectors == null &&
         configRoomManagers == null &&
         configRoomServers == null )
    {
        console.error ( 'ERROR : No config files.\n' );
        process.exit();
        return false;
    }

    app.setConfig( Constants.Config.CONNECTOR , configConnectors );
    app.setConfig( Constants.Config.ROOM_MANAGER, configRoomManagers );
    app.setConfig( Constants.Config.ROOM_SERVER, configRoomServers );
//    app.setConfig( Constants.Config.MASTER , configMaster);

    return true;
};


module.exports.getConfigByMode = function ( config )
{
    if ( config == null ) return null;

    var mode = app.getOperationMode();
    return config.mode;
}

function readConfigFile( app , configPath )
{
    var path = app.getBase() + configPath;
    try
    {
        var config = fs.readFileSync( path , 'utf8' );
        config = JSON.parse( config );
        console.log ( 'read : ' + configPath + '\n' );
        return config;
    }
    catch ( e )
    {
        console.log ( e + '\nfailed to read ' + path );
    }
    return null;
}