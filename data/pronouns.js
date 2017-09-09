var pronouns = 
[
{
  "title": "She",
  "they": "she",
  "them": "her",
  "their": "her",
  "theirs": "hers",
  "themself": "herself",
  "are": "is",
},
{
  "title": "He",
  "they": "he",
  "them": "him",
  "their": "his",
  "theirs": "his",
  "themself": "himself",
  "are": "is"
},
{
  "title": "They",
  "they": "they",
  "them": "them",
  "their": "their",
  "theirs": "theirs",
  "themself": "themself",
  "are": "are"
},
{
  "title": "Mixture",
  "they": "he",
  "them": "her",
  "their": "his",
  "theirs": "hers",
  "themself": "herself",
  "are": "is"
},
{
  "title": "Name",
  "they": "Alex",
  "them": "Alex",
  "their": "Alex's",
  "theirs": "Alex's",
  "themself": "Alex",
  "are": "is"
},
{
  "title": "Xe",
  "they": "xe",
  "them": "xem",
  "their": "xyr",
  "theirs": "xyrs",
  "themself": "xyrself",
  "are": "is"
},
{
  "title": "Zie",
  "they": "zie",
  "them": "hir",
  "their": "hir",
  "theirs": "hirs",
  "themself": "hirself",
  "are": "is"
},
{
  "title": "Spivak",
  "they": "e",
  "them": "em",
  "their": "eir",
  "theirs": "eirs",
  "themself": "emself",
  "are": "is"
},
{
  "title": "It",
  "they": "it",
  "them": "it",
  "their": "its",
  "theirs": "its",
  "themself": "itself",
  "are": "is"
},
{
  "title": "Fae",
  "they": "fae",
  "them": "faer",
  "their": "faer",
  "theirs": "faers",
  "themself": "faeself",
  "are": "is"
} 
      
];

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function initPronouns()
{
  $("#pronouns").empty();
  
  for (var i in pronouns)
  {
    var pronoun = pronouns[i];
    
    var pronounEl = $("<div class='optionsList-option'>");
    
    pronounEl.append("<div class='optionsList-optionTitle'>" + pronoun.title + "</div>");

    var phraseListEl = $("<ul style='padding-left: 0; list-style-type: none; margin-top: 0; line-height: 2;'></ul>");
    
    phraseListEl.append($("<li><span class='alternative'>" + capitalize(pronoun.they) + "</span> <span class='alternative'>" + pronoun.are + "</span> a nice person</li>"));
    phraseListEl.append($("<li>I love talking to <span class='alternative'>" + pronoun.them + "</span></li>"));
    phraseListEl.append($("<li><span class='alternative'>" + capitalize(pronoun.their) + "</span> hair is cool</li>"));
    phraseListEl.append($("<li>That black coat is <span class='alternative'>" + pronoun.theirs + "</span></li>"));
    phraseListEl.append($("<li><span class='alternative'>" + capitalize(pronoun.they) + "</span> " + ((pronoun.are == "are") ? "like" : "likes") + " <span class='alternative'>" + pronoun.themself + "</span></li>"));    
    
    pronounEl.append(phraseListEl);
    
    $("#pronouns").append(pronounEl);
  }
}

initScripts.push(initPronouns);