var should = require( 'should' );
var dnode = require( 'dnode' );
var DnodeConnector = require( '../../../lib/connectors/dnode/dnodeConnector' );

describe( '#DNodeConnector' , function() {
    it('should connect and communicate between them.' , function( done ) {
        var d1 = new DnodeConnector ( 'dnode1' , '127.0.0.1' , 3101 );

        var ds = dnode ( { getId: function ( cb ) { cb ( 'dnode-server' ); } } );
        var server = ds.listen ( 3101 );

        d1.start();

        setTimeout ( function() {
            should.equal ( d1.getServerId() , 'dnode-server' );
            server.close();
            done();
        } , 1000 );

    });

    it('should connect and communicate between them after 2 sec.' , function( done ) {
        var d1 = new DnodeConnector ( 'dnode1' , '127.0.0.1' , 3101 );

        var ds = dnode ( { getId: function ( cb ) { cb ( 'dnode-server' ); } } );
        setTimeout ( function() {
            console.log ( 'dnode is starting listening : 3101\n' );
            ds.listen ( 3101 );
        }, 1000 );

        d1.start();

        var sec = 0;
        setInterval ( function() {
            if ( sec > 4 )
            {
                should.equal ( d1.getServerId() , 'dnode-server' );
                done();
            }
            else
            {
//                should.equal ( d1.getServerId() , null );
            }
            sec++;
        } , 1000 );

    });
});