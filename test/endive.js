var endive = require( '../' );
var should = require( 'should' );
var dnode = require( 'dnode' );

var testBase = process.cwd() + '/test';

describe( 'endive' , function() {
    describe( '#endive' , function() {
        it( 'should create and get app, be the same instance' , function( done ) {
            var app = endive( { base: testBase ,
                                operationMode: 'debug'
            } );
            should.exist ( app );

            var testApp = endive.app;
            should.exist( testApp );
            should.strictEqual( app , testApp );
            done();
        })
    });

    describe( '#start' , function() {
        it( 'should start and stop successfully' , function( done ) {
            var app = endive( { base: testBase ,
                                operationMode: 'debug' ,
                                useConfigFile: false
            });
//            should.exist ( app );
//
//            app.addConnectorServer( 'connector-server-1' , 3200 );
//            app.addRoomManager( 'room-manager-1' , 3300 );
//            app.addRoomServer( 'room-server-1' , 3400 );
//
//            app.start();
//            app.stop();
            done();
        })
    })

    describe( '#start with config files' , function() {
        it( 'should start and stop successfully' , function( done ) {
            var app = endive( { base: testBase ,
                                operationMode: 'debug' ,
            });
            should.exist ( app );

            app.start();
            app.stop();
            done();
        })
    })

    describe( '#test1' , function() {
        it( 'is just test.' , function( done ) {
            var functions = {
                sum: function ( a , b , cb ) {
                    cb ( a + b );
                },
               getId: function ( cb ) {
                    cb ( 'Test ID' );
               }
            };
            var s = dnode ( functions );
            var server = s.listen ( 3005 );
            server.on ( 'connection' , function ( connection ) {
               console.log ( 'connection ' + connection.remoteAddress );
            });
            var r;
            var d = dnode ( { 'id': 'test' } ).connect ( 3005 , '127.0.0.1' , function ( remote ) { r = remote } );
            d.stream.on ( 'connect' , function() {
                console.log( 'DnodeConnector connected: 127.0.0.1:3005' );
            });
            d.on ( 'remote' , function ( remote , conn ) {
//                conn.address();
                remote.sum ( 3 , 4 , function ( sum ) {
                   console.log ( 'sum = ' + sum );
                });
            });

            d.on ( 'remote' , function ( remote , conn ) {
//                conn.address();
                remote.getId ( function ( id ) {
                    console.log ( 'id = ' + id );
                    should.equal ( id , 'Test ID' );
                    done();
                });
            });

        })
    })

    describe( '#test2' , function() {
        it( 'is just test.' , function( done ) {
            /*
            setTimeout ( function() {
                var s = dnode ( { sum : function ( a , b , cb ) { cb ( a + b )  }});
                var server = s.listen ( 3000 );
                server.on ( 'connection' , function ( connection ) {
                    console.log ( 'connection ' + connection.remoteAddress );
                });

            }, 5000 );
            var sec = 0;
            var ds = dnode ( { 'id': 'test' } );
            var d = null;
            setInterval ( function() {
                var r;
                if ( d == null )
                {
                    d = ds.connect ( 3000 , '192.168.1.220' , function ( remote ) { r = remote } );
                    d.on ( 'error' , function ( e ) {
                        if ( e === 'ECONNREFUSED' )
                        {
                            d = ds.connect ( 3000 , '192.168.1.220' , function ( remote ) { r = remote } );
                        }
                        console.log ( 'dnode error : ' + e );
                    });
                }
                console.log ( sec );
                d.on ( 'remote' , function ( remote , conn ) {
//                conn.address();
                    remote.sum ( 3 , 4 , function ( sum ) {
                        console.log ( sec + '. sum = ' + sum );
                    });
                });
//
//                d.on ( 'remote' , function ( remote , conn ) {
////                conn.address();
//                    remote.sum ( 8 , 9 , function ( sum ) {
//                        console.log ( sec + '. sum = ' + sum );
//                    });
//                });
                sec ++;
            } , 1000 );

            setTimeout ( function() {
                done();
            }, 8000 );
            */
            done();
        })
    })
});