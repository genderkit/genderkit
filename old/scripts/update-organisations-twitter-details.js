var Twitter = require('twitter-node-client').Twitter;
var yaml = require('yamljs');
var fs = require('fs');

// Data about our twitter api key
// To use this script you must enter your twitter api key details here
// Don't forget to remove it before committing anything!
var config = {
    "consumerKey": "",
    "consumerSecret": "",
    "accessToken": "",
    "accessTokenSecret": "",
    "callBackUrl": "XXX"
}

var database = {};
var userids = [];

// generic callback for handling a twitter api error
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
    console.log('Error json [%s]', JSON.stringify(err));
};

var twitter = new Twitter(config);

function updateUserFromTwitter(user)
{
	console.log("Updating user " + user.screen_name);
	for (var j = 0; j < database.organisations.length; j++)
	{
		if (database.organisations[j].twitter && database.organisations[j].twitter.toUpperCase() == user.screen_name.toUpperCase())
		{
			console.log("Found user " + user.screen_name);

			// got the user
			if (user.description)
			{
				console.log("Description: " + user.description);
				database.organisations[j].twitterDescription = user.description;
			}

			if (user.status && user.status.created_at)
			{
				console.log("Last post date: " + user.status.created_at);
				database.organisations[j].lastTwitterPost = user.status.created_at;
			}
		}
	}
}

function processUserBatch()
{
	var toProcess = userids.splice(0, userids.length > 100 ? 100 : userids.length);
	var query = { screen_name: toProcess.join(",") };
	console.log("Making Twitter API request for " + toProcess.length + " users.");
	twitter.getCustomApiCall('/users/lookup.json', query, error, function (userdata)
	{
		var users = JSON.parse(userdata);
		console.log("Got data for " + users.length + " users.");

		for (var i = 0; i < users.length; i++)
		{
			updateUserFromTwitter(users[i]);
		}

		if (userids.length > 0)
		{
			// Keep going till we run out users to proces.
			console.log("Recursing, " + userids.length + " users left.");
			processUserBatch();
		}
		else
		{
			// We've finished, write out our result
			console.log("Writing updated file.");
			fs.writeFile('./updated.yaml', yaml.stringify(database, 3), function (err) {
			  if (err) throw err;
			  console.log('It\'s saved!');
			});
		}
	});
}

fs.readFile('./organisations.yaml', 'utf8', function (err,filedata) {
	database = yaml.parse(filedata);

	console.log("Loaded " + JSON.stringify(database));
	// Work out which twitter accounts we need to query for
	
	for (var i = 0; i < database.organisations.length; i++)
	{
		if (database.organisations[i].twitter)
		{
			userids.push(database.organisations[i].twitter);
		}
	}

	processUserBatch();
});