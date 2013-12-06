
var RoomInfo = function ( roomId )
{
    this.roomId = roomId;
    this.rooms = {};
    this.Ids = {};

};

module.export = RoomInfo;

function Info ( ip , port )
{
    this.host = ip;
    this.port = port;

    this.userIds = {};
}

var pt = RoomInfo.prototype;

