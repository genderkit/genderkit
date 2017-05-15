var yaml = require('yamljs');
var fs = require('fs');

var database = {};

fs.readFile('/vagrant/git/genderkit/_data/organisations.yaml', 'utf8', function (err,filedata) {
	database = yaml.parse(filedata);

	console.log("Loaded data.");
	
	for (var i = 0; i < database.organisations.length; i++)
	{
		var org = database.organisations[i];

		if (!org.facebook && !org.facebookId && !org.twitter && !org.twitterId)
		{
			// No information available - just skip this one
			continue;
		}	

		var now = (new Date()).getTime();
		// Two years ago
		var limit = now - (2 * 365 * 24 * 60 * 60 * 1000);
		if (org.lastFacebookPost)
		{
			var then = new Date(org.lastFacebookPost);
			if (then.getTime() > limit)
			{
				if (org.archived)
				{
					console.log("Found archived org with recent updates:");
					console.log(org.name);
					console.log(org.url);
					console.log("Facebook:" + org.lastFacebookPost);
					console.log("Twitter: " + org.lastTwitterPost);
					console.log("-");
				}
				continue;
			}
		}

		if (org.lastTwitterPost)
		{
			var then = new Date(org.lastTwitterPost);
			if (then.getTime() > limit)
			{
				if (org.archived)
				{
					console.log("Found archived org with recent updates:");
					console.log(org.name);
					console.log(org.url);
					console.log("Facebook:" + org.lastFacebookPost);
					console.log("Twitter: " + org.lastTwitterPost);
					console.log("-");
				}
				continue;
			}
		}

		if (org.archived)
		{
			continue;
		}

		console.log("Found org with no recent updates:");
		console.log(org.name);
		console.log(org.url);
		console.log("Facebook:" + org.lastFacebookPost);
		console.log("Twitter: " + org.lastTwitterPost);
		console.log("-");
	}

	console.log("Finished.");
});