var dnode = require( 'dnode' );
var http = require( 'http' );

module.export = DnodeConnector;

var DnodeConnector = function ( id , ip , port )
{
    this.id = id;
    this.ip = ip;
    this.port = port;
    this.dnode = null;
    this.remote = null;
};

var pt = DnodeConnector.prototype;

pt.start = function()
{
    var self = this;
    var d = this.dnode = dnode.connect ( this.port , this.ip , function ( remote ) { self.remote = remote } );
    d.on ( 'remote' , function ( remote ) {

    });
};