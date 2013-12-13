var should = require( 'should' );
var dnode = require( 'dnode' );
var DNodeServer = require( '../../../lib/connectors/dnode/dnodeServer' );
var DNodeConnector = require( '../../../lib/connectors/dnode/dnodeConnector' );

describe( '#DNodeConnector-Server' , function() {
    it('should connect and communicate between them.' , function( done ) {

        var d1 = new DNodeConnector ( 'dnode1' , '127.0.0.1' , 3101 );
        var ds = new DNodeServer ( 'dnodeServer1' , 3101 );

        ds.start( { getId: function ( cb ) { cb ( 'dnode-server' ); } } );
        d1.start();

        setTimeout ( function() {
            should.equal ( d1.getServerId() , 'dnode-server' );
            d1.stop();
            ds.stop();
            done();
        } , 1000 );

    });
/*
    it('should connect and communicate between them after 2 sec.' , function( done ) {
        var d1 = new DNodeConnector ( 'dnode1' , '127.0.0.1' , 3101 );
        var ds = dnode ( { getId: function ( cb ) { cb ( 'dnode-server' ); } } );
        setTimeout ( function() {
            console.log ( 'dnode is starting listening : 3101\n' );
            var server = ds.listen ( 3101 );
            server.on( 'close' , function() {
                console.log ( 'dnode server closed: 3101\n' );
            });
            server.on( 'disconnect' , function() {
                console.log ( 'dnode server: client disconnected \n' );
            });
        }, 2000 );
        d1.start();

        var sec = 0;
        setInterval ( function() {
            if ( sec > 2 )
            {
                should.equal ( d1.getServerId() , 'dnode-server' );
                d1.stop();

                setTimeout ( done , 1000 );
            }
            else
            {
//                should.equal ( d1.getServerId() , null );
            }
            sec++;
        } , 1000 );
    });
    */
});