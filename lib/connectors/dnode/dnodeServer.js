var dnode = require( 'dnode' );
var util = require( './../../util/utils' );

var DNONE_NONE              = 0;
var DNONE_CONNECTING        = 1;
var DNODE_CONNECTED         = 2;
var DNODE_DISCONNECTED      = 3;

var STATE_STOP              = 0;
var STATE_START             = 1;

var DNodeServer = function ( id , port ) {

    this.id = id;
    this.serverId = null;
    this.port = port;
    this.dnodeServer = null;

    this.state = STATE_STOP;
};

module.exports = DNodeServer;

DNodeServer.prototype.start = function ( rpcObject ) {
    if ( this.state == STATE_START ) return;
    var self = this;
    var ds = this.dnodeServer = dnode( rpcObject ).listen( this.port );
    ds.on( 'connection' , function( socket ) {
        util.log( 'dnode server accepted(%d): %s:%d' , self.port , socket.remoteAddress , socket.remotePort );
        socket.on( 'disconnect' , function() {
            util.log( 'client disconnected(%s) in dnode server.' , socket.id );
        });
    });
    ds.on( 'close' , function() {
        util.log( 'dnode server closed: %d' , self.port );
    });
    this.state = STATE_START;
};

DNodeServer.prototype.stop = function () {
    if ( this.state == STATE_STOP) return;

    this.dnodeServer.close( function() {
        util.log( 'dnode server closed.' );
    });

    this.state = STATE_STOP;
};
