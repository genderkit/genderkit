var Twitter = require('twitter-node-client').Twitter;
var yaml = require('yamljs');
var fs = require('fs');
var http = require('http');
var download = require('download');

var database = {};

fs.readFile('/vagrant/git/genderkit/_data/organisations.yaml', 'utf8', function (err,filedata) {
	database = yaml.parse(filedata);

	console.log("Loaded!");
	// Work out which twitter accounts we need to query for
	
	for (var i = 0; i < database.organisations.length; i++)
	{
		if (database.organisations[i].twitterIcon && database.organisations[i].twitterId)
		{
			download(database.organisations[i].twitterIcon)
				.pipe(fs.createWriteStream("/vagrant/git/genderkit/assets/images/organisations/" + database.organisations[i].twitterId + ".jpg"));
		}
		if (database.organisations[i].facebookIcon && database.organisations[i].facebookId)
		{
			download(database.organisations[i].facebookIcon)
				.pipe(fs.createWriteStream("/vagrant/git/genderkit/assets/images/organisations/" + database.organisations[i].facebookId + ".jpg"));
		}
	}
});