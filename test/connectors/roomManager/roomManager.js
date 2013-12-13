var should = require( 'should' );
var RoomManager = require( '../../../lib/roomManager/roomManager' );

describe( '#RoomManager' , function() {
    it('should communicate among them.' , function( done ) {

        var i = 0;
        var rmId = [];
        var rm = [];
        for ( i = 0 ; i < 3 ; i++ )
        {
            var r = new RoomManager( 'RoomManager-' + (i+1) , 3301 + i );
            r.addRemoteRoomManager( 'RoomManager-' + ((i+1) % 3) + 1 , '127.0.0.1' , ports[i] );
            rm.push ( r );
            r.start();
        }
        var ports = [ 3302 , 3303 , 3301 ];
        for ( i = 0 ; i < 3 ; i++ )
        {
        }
        setTimeout ( function() {
            done();
        } , 1000 );

    });
});