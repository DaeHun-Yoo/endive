var dnode = require( 'dnode' );
var util = require('util');

var DNONE_NONE              = 0;
var DNONE_CONNECTING        = 1;
var DNODE_CONNECTED         = 2;
var DNODE_DISCONNECTED      = 3;

var STATE_STOP              = 0;
var STATE_START             = 1;

var DNodeConnector = function ( id , host , port ) {
    this.id = id;
    this.serverId = null;
    this.host = host;
    this.port = port;
    this.dnode = null;
    this.remote = null;

    this.retryConnectInterval = 1000;

    this.state = STATE_STOP;
};

module.exports = DNodeConnector;

DNodeConnector.prototype.setRetryConnectInterval = function ( interval ) {
    this.retryConnectInterval = interval;
};

DNodeConnector.prototype.start = function () {
    if ( this.state == STATE_START ) return;
    this.tryToConnect();

    this.state = STATE_START;
};

DNodeConnector.prototype.stop = function () {
    if ( this.state == STATE_STOP) return;

    this.dnode.stream.destroy();

    this.state = STATE_STOP;
};

DNodeConnector.prototype.tryToConnect  = function () {
    console.log ( util.format ( '[%s] DNodeConnect try to connect: %s:%s' , this.id , this.host , this.port ) );
    var self = this;
    var d = this.dnode = dnode.connect( this.port , this.host , function ( remote ) {
        self.remote = remote;
    });
    d.stream.on ( 'connect' , function() {
        util.log( 'DNodeConnector connected: ' + self.host + ':' + self.port );

    });
    d.stream.on ( 'close' , function() {
        util.log( 'DNodeConnector closed: ' + self.host + ':' + self.port );

        if ( self.state == STATE_START )
        {
            setTimeout ( self.tryToConnect() , this.retryConnectInterval );
        }
    });
    d.on( 'remote' , function ( remote ){
        remote.getId ( function ( id ) {
            self.serverId = id;
        });

    });
    d.on( 'error' , function( e ) {
        if ( e.code === 'ECONNREFUSED' )
        {
//            process.nextTick ( self.tryToConnect() );
        }
        util.error ( 'DNodeConnector: ' + e );
    });

};

DNodeConnector.prototype.getServerId = function() {
    return this.serverId;
};
