const Steam = require('steam')

var steamClient = new Steam.SteamClient();
var steamUser = new Steam.SteamUser(steamClient);
var steamFriends = new Steam.SteamFriends(steamClient);



function friend(user, type) {

	switch (type) {
    	case Steam.EFriendRelationship.Blocked:
      	//User blocked bot
    	case Steam.EFriendRelationship.RequestRecipient:
      	// POST /bot_api/user "steam_id": steam_id
      	console.log("Get new friend request from", user)
      	steamFriends.addFriend(user);
      	steamFriends.sendMessage(user, "Welcome")
      	break;
      	//Get friend request
    	case Steam.EFriendRelationship.Friend:
      	// POST /main_api/user/steam_bot "steam_id": user
      	//Accept invite
    	case Steam.EFriendRelationship.RequestInitiator:
      	//Request a friend invite
    	case Steam.EFriendRelationship.Ignored:
      	//Ignored
    	case Steam.EFriendRelationship.IgnoredFriend:
      	//Ignored
  }
}

function logOnResponse(logonResp) {
	if (logonResp.eresult == Steam.EResult.OK) {
		console.log('Logged in!');
	}
}

module.exports = class Bot {

	constructor(login, password) {
		steamClient.connect();
		steamClient.on('connected', function() {
			steamUser.logOn({
				account_name: login,
				password: password
			});
		});

		steamClient.on('logOnResponse', function(logonResp) {
			logOnResponse(logonResp);
		});

		steamFriends.on('relationships', function() {});

		steamFriends.on('friend',function (user, type) { 
			friend(user,type);
		});
	}

	addFriend(steam_id) {
		steamFriends.addFriend(steam_id);
	}

	sendMessage(steam_id, msg) {
		steamFriends.sendMessage(steam_id, msg);
	}

};