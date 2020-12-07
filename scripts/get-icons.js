var Twitter = require('twitter-node-client').Twitter;
var yaml = require('yamljs');
var fs = require('fs');
var http = require('http');
var download = require('download');

var database = {};

fs.readFile('/vagrant/git/genderkit/_data/organisations.yml', 'utf8', function (err,filedata) {
	database = yaml.parse(filedata);

	console.log("Loaded!");
	// Work out which twitter accounts we need to query for
	
	for (var i = 0; i < database.organisations.length; i++)
	{
		if (database.organisations[i].twitterIcon && database.organisations[i].twitterID && !database.organisations[i].archived)
		{
			console.log("Downloading " + database.organisations[i].name + "(TwitterID:" + database.organisations[i].twitterID + ")");
			download(database.organisations[i].twitterIcon, "organisation-icons/", {"filename": database.organisations[i].twitterID + ".jpg"})
				.then(data => {
					// nuffin yet
				})
				.catch((reason) => {
					throw(JSON.stringify(reason));
				});
		}

/* 		if (database.organisations[i].facebookIcon && database.organisations[i].facebookId)
		{
			console.log("Downloading " + database.organisations[i].name);
			download(database.organisations[i].facebookIcon)
				.then(data => {
					fs.writeFileSync("/vagrant/git/genderkit/assets/images/organisations/" + database.organisations[i].facebookId + ".jpg", data);
				})
				.catch((reason) => {
					throw(reason);
				});
		} */
	}
});
