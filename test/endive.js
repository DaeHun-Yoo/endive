var endive = require( '../' );
var should = require( 'should' );
var mockBase = process.cwd() + '/test';

describe( 'endive' , function() {
    describe( '#endive' , function() {
        it( 'should create and get app, be the same instance' , function( done ) {
            var app = endive( { base: mockBase } );
            should.exist ( app );

            var testApp = endive.app;
            should.exist( testApp );
            should.strictEqual( app , testApp );
            done();
        })
    })
});