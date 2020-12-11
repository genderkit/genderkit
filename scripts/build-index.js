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
    "race": ["racism", "bame", "bme", "poc", "ethnicity", "hate crime"],
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
    "hormones": ["medications", "blockers"]
};

fs.readFile('/vagrant/git/genderkit/_data/publications.yml', 'utf8', function (err, filedata) {
    database = yaml.parse(filedata);

    database.publications = database.publications.filter(el => !el.archived);

    database.publications.forEach((el, i) => {
        el.id = urlslug(el.url);

        var keywords = [];
        if (el.tags)
        {
            el.tags.forEach(i => keywords.push(i))
            el.tags.forEach(tag => {
                    if (synonyms[tag.toLowerCase()]) {
                        synonyms[tag.toLowerCase()].forEach(i => keywords.push(i))
                    }
                });
        }
        el.tagString = keywords.join(" ");
        var imagename = slug(el.organisation, " ") + " - " + slug(el.title, " ");
        el.image = '/assets/images/publications/' + imagename + '.jpg';
    });

    console.log(JSON.stringify(database.publications));

});
