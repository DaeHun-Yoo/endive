var dnode = require( 'dnode' );
var http = require( 'http' );

var DnodeConnector = function ( id , host , port ) {
    this.id = id;
    this.serverId = null;
    this.host = host;
    this.port = port;
    this.dnode = null;
    this.remote = null;
};

module.exports = DnodeConnector;

DnodeConnector.prototype.start = function () {
    this.tryToConnect();
};

DnodeConnector.prototype.tryToConnect  = function () {
    console.log ( 'DnodeConnect try to connect: ' + this.host + ':' + this.port + '\n' );
    var self = this;
    var d = this.dnode = dnode.connect( this.port , this.host , function ( remote ) {
        self.remote = remote;
    });
    d.stream.on ( 'connect' , function() {
        console.log( 'DnodeConnector connected: ' + self.host + ':' + self.port + '\n' );

    });
    d.on( 'remote' , function ( remote ){
        remote.getId ( function ( id ) {
            self.serverId = id;
        });

    });
    d.on( 'error' , function( e ) {
        if ( e === 'ECONNREFUSED' )
        {
            setTimeout ( self.tryToConnect() , 1000 );
        }
        console.error( 'DnodeConnector: ' + e );
    });

};

DnodeConnector.prototype.getServerId = function() {
    return this.serverId;
};
