
function searchName(search)
{
	var results = [];
	for (var k in given)
			{
				for (var l in given[k].data)
				{
					if (given[k].data[l].data.toUpperCase() == search.toUpperCase())
					{
						results.push(given[k]);
					}
				}
			}

	return results;
}

function initDiminutivesList()
{
	for (var i in popularDiminutives)
	{
		var nickEl = $("<div class='optionsList-option'></div>");
		var diminutive = popularDiminutives[i];

		nickEl.append("<span class='optionsList-optionTitle'>" + diminutive.name + "</span>");
		/*nickEl.append("<span class='tableHeading'><span class='right'>short for</span><span class='left'>top 100 name</span></span>");*/
		var search = diminutive.name;
		searchName(search);

		for (var j in diminutive.diminutives)
		{
			search = diminutive.diminutives[j];
			var results = searchName(search);

			if (results.length > 0)
			{
				var start = results.map(function (i) { return parseInt(i.start); }).reduce(function (a, b) { return Math.min(a, b); });

				var end = results.map(function (i) { return parseInt(i.end); }).reduce(function (a, b) { return Math.max(a, b); });

				nickEl.append("<span class='tableRow'><span class='left'>" + search + "</span><span class='right'>" + ("" + start).substring(0, 3) + "0s-" + ("" + end).substring(0, 3) + "0s</span></span>");
			}
			else
			{
				/*nickEl.append("<span class='tableRow'><span class='left'>" + search + "</span><span class='right'>never</span></span>");*/
			}
		}

		$('#nicknames').append(nickEl);
	}
}

initScripts.push(initDiminutivesList);