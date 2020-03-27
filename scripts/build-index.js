var yaml = require('yamljs');
var fs = require('fs');
var urlslug = require('url-slug');
var slug = require('slug');

var synonyms =
{
    "care": ["social care", "social services"],
    "under 18s": ["children", "youth", "kids", "adolescent"],
    "studies": ["research", "surveys"],
    "education": ["schools", "colleges", "universities"],
    "local school policies": ["schools", "pupils", "students", "teachers", "teaching"],
    "media": ["tv", "television", "radio", "interviews", "documentaries"],
    "violence": ["rape", "assault"],
    "surgery": ["operations", "surgeons", "hospitals"],
    "faith": ["religion", "spirituality"],
    "race": ["racism", "bame", "bme", "poc", "ethnicity", "hate crime", "diversity"],
    "wales": ["welsh", "cymru"],
    "legal": ["justice"],
    "prisons": ["prisoners", "justice"],
    "sport": ["exercise", "fitness"],
    "employment": ["work", "jobs", "workplaces", "employers"],
    "immigration and asylum": ["asylum"],
    "therapy": ["psychotherapy", "counselling"],
    "national union guidance": ["unions", "labour"],
    "gender recognition": ["GRC", "certificate"],
    "nonbinary": ["non-binary"],
    "gender clinics": ["GICs"],
    "military": ["armed forces", "forces", "defence"],
    "family": ["parents"],
    "hormones": ["medications", "blockers"],
    "menstruation": ["periods"],
    "lower body": ["genitals"],
    "facial hair": ["beard", "stubble", "mustache"],
    "face": ["acne", "spots", "skin"],
    "fragrance": ["odour", "odor"],
    "menstruation": ["periods"],
    "upper body": ["chest", "breasts", "waist"],
    "fertility": ["pregnancy"]
};

var database = [];

try {
    var publications = yaml.parse(fs.readFileSync('/vagrant/git/genderkit/_data/publications.yaml', 'utf8'))
    var categories = yaml.parse(fs.readFileSync('/vagrant/git/genderkit/_data/categories.yaml', 'utf8'))
    var books = yaml.parse(fs.readFileSync('/vagrant/git/genderkit/_data/books.yaml', 'utf8'))
    var organisations = yaml.parse(fs.readFileSync('/vagrant/git/genderkit/_data/organisations.yaml', 'utf8'))

    publications.publications = publications.publications.filter(el => !el.archived);

    publications.publications.forEach((el, i) => {
        el.id = urlslug(el.url);
        el.tags = el.tags ? el.tags.map(i => { return {name: i, url: ""} }) : [];
        el.tags.splice(0, 0, {name: "PDF", url: "/publications"});
        el.weighting = 20;
        el.details = el.organisation + ", " + el.year;
        var imagename = slug(el.organisation, " ") + " - " + slug(el.title, " ");
        el.image = '/assets/images/publications/' + imagename + '.jpg';
        el.kind = "publication";
    });

    publications.publications.forEach(i => { database.push(i) });

    organisations.organisations
        .map(i => {
            return {
                "kind": "organisation",
                "weighting": 10,
                "title": i.name,
                "url": i.url,
                "details": i.manualDescription ? i.manualDescription : (i.twitterDescription ? i.twitterDescription : i.facebookDescription),
                "tags": i.tags ? i.tags.map(i => { return {name: i, url: ""} }) : [],
                "image": '/assets/images/organisations/' + (i.image ? i.image : (i.facebookId ? i.facebookId : i.twitterID)) + '.jpg'
            };
        })
        .forEach(i => database.push(i));

    categories.explore.forEach((el, i) => {
        el.image = '/assets/images/icons/icon_' + slug(el.title).toLowerCase() + '.png';
        el.details = "";
        el.weighting = 0;
        el.kind = "category";
    });

    categories.explore.forEach(i => { database.push(i) });

    books.books
        .forEach(i => {
            i.details = i.author + ", " + i.year
            i.kind = "book"
            i.tags = i.tags ? i.tags.map(i => { return {name: i, url: ""} }) : []
            i.tags.splice(0, 0, {name: "Books", url: "/books"})
            i.weighting = 15;
            i.image = '/assets/images/books/' + i.title + ".jpg"
            database.push(i)
        });

    function getMetadata(input, key)
    {
        var re = new RegExp(key + ": (.*)", "g");
        var matches = re.exec(input);
        if (matches)
        {
            return matches[1].replace(/["']/g, "")
        }
        else
        {
            return null;
        }
    }

    var articlePath = "/vagrant/git/genderkit/_data/articles/";
    var articles = fs.readdirSync(articlePath, {"withFileTypes": true});
    articles
        .filter(i => i.isFile())
        .forEach(i => {
            var article = yaml.parse(fs.readFileSync(articlePath + i.name, 'utf8'))
            var filepath = "/vagrant/git/genderkit/_articles/" + i.name.replace(".yaml", ".md");
            var raw = fs.readFileSync(filepath, 'utf8');
            article.title = getMetadata(raw, "title");
            article.weighting = getMetadata(raw, "weighting");
            var image = getMetadata(raw, "image")
            article.image = image ? image : "/assets/images/nophoto.png";
            article.url = "/article/" + i.name.replace(".yaml", "")
            article.details = article.summary;
            article.kind = "article";
            article.tags = [];
            article.effects.forEach(effect => {
                article.tags.push({name: effect.category, url: "/category/" + slug(effect.category).toLowerCase()});
            });
            database.push(article);
        });

    var wordsPath = "/vagrant/git/genderkit/_words/";
    var words = fs.readdirSync(wordsPath, {"withFileTypes": true});
    words
    .filter(i => i.isFile())
    .forEach(i => {
        var filepath = wordsPath + i.name;
        var raw = fs.readFileSync(filepath, 'utf8');
        var word = {};
        word.title = getMetadata(raw, "title");
        word.image = "/assets/images/nophoto.png";
        word.url = "/words/" + i.name.toLowerCase().replace(".md", "")
        word.kind = "word";
        word.tags = [{name: "Words", url: "/words"}];
        word.weighting = 6;
        database.push(word);
    });

    database.forEach(el => {
        var keywords = [];
        if (el.tags) {
            el.tags.forEach(i => keywords.push(i))
            el.tags.forEach(tag => {
                if (synonyms[tag.name.toLowerCase()]) {
                    synonyms[tag.name.toLowerCase()].forEach(i => keywords.push(i))
                }
            });
        }
        else {
            el.tags = [];
        }
        if (el.aka)
        {
            el.aka.forEach(i => keywords.push(i));
        }
        el.tagString = keywords.join(",");
    })

    console.log(JSON.stringify(database));

} catch (err) {
    console.error(err)
}
