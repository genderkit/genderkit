var colours = ["#98f","#bd0","#8ea","#0cc","#0bf","#6af"] /*["#80F", "#f80", "#f00"];*/
var weights = [300, 400, 700];

var consolidated = {};
var nongendered = [];

var genderedness = 0.15;

var target = "#nongendered-names"

function drawNonGenderedNames()
{
	$(target).empty();
	nongendered = [];

		for (var key in consolidated)
		{
			if (key && consolidated[key].name)
			{
				if (consolidated[key].gender < 1 - genderedness && consolidated[key].gender > genderedness)
				{
					nongendered.push(consolidated[key]);
				}
			}
		}

		nongendered = nongendered.sort(function (a, b) { 
			return b.total - a.total; 
		});

		nongendered = nongendered.slice(0, 50);

		var lump = "";
		for (var key in nongendered)
		{
			lump += " - " + nongendered[key].name + "\n";	
		}

		$(target).html(lump);
	
	$("#title").html("Given names with at least " + (genderedness * 100).toFixed(0) + "% female and " + (genderedness * 100).toFixed(0) + "% male birth certificates (UK, 1996-2015)"); 
}

function initNonGenderedNames()
{
	var path = "cleanedNames1996to2015.csv";

	d3.csv(path, function (data) {
		for (var i in data)
		{
			var item = data[i];
			consolidated[data[i].name] = data[i];
		}
		drawNonGenderedNames();
		
		/*$("#amount").on("change", function (e)
		{
			console.log((e.target).value);
			genderedness = (e.target).value / 100;
			draw();
		});*/
	});
}

initScripts.push(initNonGenderedNames);