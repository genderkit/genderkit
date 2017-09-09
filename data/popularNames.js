var startYear = $('#yearSelector').val();
var startIndex = 0;
var popularNamesWidth = $('#popular-names').width();

function drawPopularNames()
{
	$('#popular-names').empty();

	if ($('#yearSelector').val() != startYear)
	{
		var startYear = $('#yearSelector').val();

		var names = [];

		for (var i in given)
		{
			if (given[i].start == startYear)
			{
				for (var j in given[i].data)
				{
					names.push(given[i].data[j].data);
				}
			}
		}

		names = names.sort();
		names = d3.shuffle(names);
	}

	var x = 0;
	var y = 0;
	var size = $('#popular-names').width();
	popularNamesWidth = size;
	var height = Math.min(400, size * 0.6);
	$('#popular-names').height(height);
	var left = $('#popular-names').position().left;
	var top = $('#popular-names').position().top;
	var columnSize = 90 + ((size - 300) / 30);
	var columns = Math.floor(size / columnSize);
	var padding = (size - (columns * columnSize)) / (columns + 1);
	var perColumn = Math.floor((height - 20) / 40);
	var total = perColumn * columns;
	x += padding;

	var showMore = false;
	var blob = "";
	for (var i = 0; i < names.length; i++)
	{
		blob += "- " + names[i].toLowerCase() + "\n";
	}
	$('#popular-names').html(blob);
}

function initPopularNames()
{
	$('#yearSelector').on("change", function ()
	{
		drawPopularNames();
	});

	$('#popular-names-more').on("click", function ()
	{
		drawPopularNames();
		return true;
	});

	$( window ).resize(function() {
		if ( popularNamesWidth != $('#popular-names').width())
		{
			drawPopularNames();
		}
	});

	drawPopularNames();
}

initScripts.push(initPopularNames);