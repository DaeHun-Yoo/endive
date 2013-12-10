var os = require( 'os' );

module.exports.getLocalIPs = function ( family )
{
    if ( arguments.length == 0 )
    {
        family = 'IPv4';
    }
    var addresses = [];
    var interfaces = os.networkInterfaces();
    for ( var i in interfaces )
    {
        interfaces[i].forEach ( function ( contents ) {
           if ( contents.family == family )
           {
               addresses.push ( contents.address );
           }
        });
    }
    return addresses;
};

module.exports.filterObjectsFromArray = function ( array , objects , key )
{
    var results = [];
    var length = array.length;
    var objLength = objects.length;
    for ( var i = 0 ; i < length ; i++ )
    {
        var value = array[i];
        for ( var j = 0 ; j < objLength ; j++ )
        {
            var object = objects[j];
//            console.log ( object[key] + ' == ' + value );
            if ( object[key] == value )
            {
                results.push ( object );
                console.log ( 'register : ' + object.host + ':' + object.port + '\n' );
            }
        }
    }
    return results;
};

