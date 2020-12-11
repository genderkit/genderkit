var Twitter = require('twitter-node-client').Twitter;
var yaml = require('yamljs');
var fs = require('fs');

// Data about our twitter api key
// To use this script you must enter your twitter api key details here
// Don't forget to remove it before committing anything!
var config = {
    "consumerKey": "nf2fQ8hMjz6qaXGPDr7sOGHV8",
    "consumerSecret": "IliPA1F8sa6Q3kXaTSoiLqKNoaPetlJLB17ikQbSaDgnV1UW5j",
    "accessToken": "620293489-E3DZxpDDYyoFDOSdgGS20BSdg5TNG1PL9r2T9qcF",
    "accessTokenSecret": "EZQVIAGESLKLYDfYK3B1NZs71uzgUK3jwv7aVj3JaGFgr",
    "callBackUrl": "http://genderkit.org.uk"
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
				//console.log("Description: " + user.description);
				database.organisations[j].twitterDescription = user.description;
			}

			if (user.status && user.status.created_at)
			{
				//console.log("Last post date: " + user.status.created_at);
				database.organisations[j].lastTwitterPost = user.status.created_at;
			}

			if (user.profile_image_url_https)
			{
				database.organisations[j].twitterIcon = user.profile_image_url_https;
			}
		}
	}
}

function processUserBatch()
{
	var toProcess = userids.splice(0, userids.length > 100 ? 100 : userids.length);
	var query = { user_id: toProcess.join(",") };
	console.log("Making Twitter API request for " + toProcess.length + " users.");
	twitter.getCustomApiCall('/users/lookup.json', query, error, function (userdata)
	{
		var users = JSON.parse(userdata);
		console.log("Got data for " + users.length + " users.");

		for (var i = 0; i < users.length; i++)
		{
			updateUserFromTwitter(users[i]);
		}

		// Find dead accounts
		for (var i = 0; i < toProcess.length; i++)
		{
			var found = false;
			for (var j = 0; j < users.length; j++)
			{
				if (users[j].id_str == toProcess[i])
				{
					found = true;
				}
			}

			if (!found)
			{
				console.log("ERROR: Could not find user id " + toProcess[i]);
				for (var j = 0; j < database.organisations.length; j++)
				{
					if (database.organisations[j].twitterID && database.organisations[j].twitterID == toProcess[i])
					{
						console.log("Organisation name: " + database.organisations[j].name);
					}
				}
			}
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
			fs.writeFile('/vagrant/git/genderkit/_data/organisations.yml', yaml.stringify(database, 3), function (err) {
			  if (err) throw err;
			  console.log('It\'s saved!');
			});
		}
	});
}

fs.readFile('/vagrant/git/genderkit/_data/organisations.yml', 'utf8', function (err,filedata) {
	database = yaml.parse(filedata);

	console.log("Loaded YAML.");

	// Validate that all the accounts that should have a Twitter ID have them
	for (var i = 0; i < database.organisations.length; i++)
	{
		if (database.organisations[i].twitter)
		{
			if(!database.organisations[i].twitterID)
			{
				console.log("ERROR: No Twitter ID for organisation " + database.organisations[i].twitter);
			}
		}
	}


	// Work out which twitter accounts we need to query for
	for (var i = 0; i < database.organisations.length; i++)
	{
		if (database.organisations[i].twitterID && !database.organisations[i].archived)
		{
			userids.push(database.organisations[i].twitterID);
		}
	}

	processUserBatch();
});
