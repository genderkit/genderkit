var yaml = require('yamljs');
var fs = require('fs');
var slug = require('slug');
var format = require('date-format');
var exec = require('child_process').execSync;

var database = {};

fs.readFile('/vagrant/git/genderkit/_data/organisations.yml', 'utf8', function (err,filedata) {
	database = yaml.parse(filedata);

	console.log("Loaded data.");
	
    var now = (new Date());
    var folder = "./organisations/" + format.asString("yyyy-MM-dd", now) + "/";

    exec('rm -rf ' + folder + "", (err, stdout, stderr) => {
            
      if (!err)
      {
        console.log("Cleaned archive folder.");
      }

    });


    exec('mkdir ' + folder, (err, stdout, stderr) => {
            
      if (err) {
        // node couldn't execute the command
        console.log("ERROR - couldn't create archive folder.");
        console.log(err);
        return;
      }
      else
      {
        console.log("Made archive folder.");
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

	for (var i = 0; i < database.organisations.length; i++)
	{
		var org = database.organisations[i];

    if (org.facebook || org.twitter)
    {
      continue;
    }

        console.log("Getting " + org.name);

        var useragent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0\"";

        var filename = slug(org.name, " ") + ".html";
    	exec('wget --header=\"Accept: */*\" --user-agent=\"' + useragent + ' -O \"' + folder + filename + '\" \"' + org.url + '\"', (err, stdout, stderr) => {
        //exec('lynx -source \"' + pub.url + '\" > \"' + folder + filename + "\"", (err, stdout, stderr) => {
    	  
          if (err) {
    	    // node couldn't execute the command
            console.log("ERROR");
            console.log(err);
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
    	    return;
    	  }
          else
          {
            console.log("Success.");
          }
    	});

	}

	console.log("Finished.");
});
