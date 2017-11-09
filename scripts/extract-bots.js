var fs = require('fs');
fs.readFile('/home/vagrant/bots.json', 'utf8', function (err, filedata) {

	if (err)
	{
		throw (err);
	}

	database = JSON.parse(filedata);

	output = "";

	for (var i in database)
	{
		output += "" + (database[i].pattern) + "\n";
	}

	fs.writeFile('/home/vagrant/botoutput.txt', output, (err) => {
	  if (err) throw err;
	});

	});