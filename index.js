var Steam = require('steam');
var fs = require('fs');

var steamClient = new Steam.SteamClient();
var steamUser = new Steam.SteamUser(steamClient);
var steamFriends = new Steam.SteamFriends(steamClient);

steamClient.connect();
steamClient.on('connected', function() {
  steamUser.logOn({
    //account_name: 'd2battles1',
    //password: 'nT3J2aT3'
    account_name: 'megapp916',
    password: '40olevuz'
  });
});

steamClient.on('logOnResponse', function(logonResp) {
  if (logonResp.eresult == Steam.EResult.OK) {
    console.log('Logged in!');
    steamFriends.setPersonaState(Steam.EPersonaState.Online); // to display your bot's status as "Online"
    steamFriends.setPersonaName('Haruhi'); // to change its nickname
    steamFriends.joinChat('103582791431621417'); // the group's SteamID as a string
  }
});

steamClient.on('servers', function(servers) {
  fs.writeFileSync('servers', JSON.stringify(servers));
});

steamFriends.on('message', function(source, message, type, chatter) {
  // respond to both chat room and private messages
  console.log('Received message: ' + message);
  if (message == 'ping') {
    steamFriends.sendMessage(source, 'pong', Steam.EChatEntryType.ChatMsg); // ChatMsg by default
  }
});

steamFriends.on('relationships', function() {
  steamFriends.addFriend('76561198807432163');
});

steamFriends.on('friend', function(user, type) {
  console.log(user, type)

  /*
    Проверка на нужного человка

   */
  /*

  Добавляем в друзья

  */
  if (type == Steam.EFriendRelationship.RequestRecipient) {
    console.log("New friend request");
    steamFriends.addFriend(user);
    steamFriends.sendMessage(user, "Welcome")
  }
});

function sendMessage(SteamID, message) {
  // body...
};

function isFriend(SteamID) {
  // body...
};
