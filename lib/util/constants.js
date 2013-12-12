module.exports = {

    Options: {
        BASE: 'base' ,
        OPERATION_MODE: 'operationMode' ,       // development , production
        USE_CONFIGE_FILE: 'useConfigFile'      // true , false
    } ,

    ConfigFilePath: {
        CONNECTORS: '/config/connectors.json' ,
        ROOM_MANAGERS: '/config/roommanagers.json' ,
        ROOM_SERVERS: '/config/roomservers.json' ,
        MASTER: '/config/master.json'
    } ,

    Config: {
        CONNECTOR: 1 ,
        ROOM_MANAGER: 2 ,
        ROOM_SERVER: 3 ,
        MASTER: 4
    } ,

    Mode: {
        DEBUG: 'debug' ,
        RELEASE: 'release'

    }
};