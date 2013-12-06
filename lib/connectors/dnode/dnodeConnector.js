var dnode = require( 'dnode' );
var http = require( 'http' );

module.export = DnodeConnector;

var DnodeConnector = function ( id , host , port )
{
    this.id = id;
    this.host = host;
    this.port = port;
    this.dnode = null;
    this.remote = null;
};

var pt = DnodeConnector.prototype;

pt.start = function()
{
    var self = this;
    var d = this.dnode = dnode.connect ( this.port , this.host , function ( remote ) { self.remote = remote } );
    d.on ( 'remote' , function ( remote ) {

    });
};