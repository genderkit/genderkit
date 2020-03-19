window.onload = (e) => {
    getData();
};

var db = {};
var index = {};
var lastkey = 0;
var query = "";

function getData()
{
    fetch("/assets/json/search-index.json")
        .then(response => response.json())
        .then(data => { 
            db = data.slice(0, 50) // TODO: sort by 
            index = new quickScore.QuickScore(data, ["title", "organisation", "tagString"]);
            update();
        })
}

function update()
{
    if (Date.now() - lastkey > 100)
    {
        var results = [];
        if (query == "") 
        { 
            results = db;
        } 
        else 
        { 
            var results = index
                .search(query)
                .slice(0, 50)
                .filter(i => i.score > 0.5)
                .map(i => i.item);
        }
    
        if (results.length > 0)
        {
            document.getElementById("publications").innerHTML = Handlebars.templates.publications(results);
        }
        else
        {
            // do something to indicate nothing was found
            document.getElementById("publications").innerHTML = "No results found."
        }
    }
}

document.getElementById("searchbox").ontouchstart = (e) => {
    document.getElementById("search").scrollIntoView()
};

document.getElementById("searchbox").oninput = (e) => {
    lastkey = Date.now();
    query = e.target.value.toLowerCase();

    // Wait a few milliseconds to see if the user changes their mind and types something else
    setTimeout(update, 150);
};
