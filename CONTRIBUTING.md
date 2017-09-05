# Contributing

Hi! We're really glad you are interested in contributing to Gender Construction Kit!

First, something really important:

**Any contributions you make to the articles on this website will be made available under the [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) license.**

Here's how to do some common things:

- to add a new organisation to the organisations list, edit the _data/organisations.yaml file.
- to add a new organisation to the publications list, edit the _data/publications.yaml file.
- if you want to change the "What effects does it have?", "What is it?" or "How long does it last?" sections of an article, look in _data/articles/ for a file with the same name as the article - that's where you find that stuff.

If you need help, message us on Twitter or Facebook and we can help get you started. We'd be really excited to hear from you!

### How do I get my hard work credited?

Your work will appear on the credits page if you add an entry for yourself [to this file](https://github.com/genderkit/genderkit/blob/master/_data/credits.yaml).

## Writing articles

### Style

Whereever possible, try and use the following style:

- Rather than saying "people with x" say "If you have x" or "If you experience x"
- Rather than saying "patients" say "you"
- Rather than using brand names (e.g. Viagra) use the actual chemical name where possible, then add brand names in brackets afterwards if it will help the reader
- If you can find any further information from NHS Choices, a government webpage, or a gender clinic, include the link at the bottom of the article. (TODO: should we have a special graphic style to highlight this?)

### Articles about chemical/medical/surgical interventions

- Include information about typical recovery times if appropriate and a reminder about how this may affect education or employment, and how much help they may require during recovery
- Include information about the most common side effects and risks, and information about where to find more information about these. For very common side effects, if there are methods to mitigate these, describe them. Describe risks in terms of percentages of people (e.g. "1.5% of people who have this surgery"), rather descriptions of probability like"1 in x" or descriptive words.
- If there is a more commonly used alternative treatment, or the number of alternatives is three or less, list them. 
- Are there any specialist organisations/groups that can provide further advice and information?

### What should articles have in them?

The following should be in the frontmatter (the stuff between the --- and the --- at the top of the .md file):

- Page title (the main name it is called by. This should start with a captial letter but have no other capitals)
- Page illustration - Pictures must have a public domain license, and ideally you should have taken the picture yourself. If you are not sure, ask in the Telegram channel. Do not use pictures found on a normal Google search. If you include a picture, you *must* include a caption - we need this so that blind/partially sighted users still know what the image is a picture of. 

The following should be in the data file (.yaml in _data/articles/):

- Summary - a brief one sentence summary of what the treatment/activity is and what it is meant to do (as brief as possible). (Don't end this in a full stop, please!)
- AKA - other names that the treatment/activity might be known by. If more than one name, put commas between them.
- Effects - list of effects that the treatment/activity has - i.e. what it changes. Make sure that for each effect, you link it to a category from the file _data/categories.yaml. End the description of each effect with a full stop.
- Duration - A description of how long the thing lasts. Nake sure that if this article is about something with permanent, irreversable effects, you say so. End the duration description with a full stop.

The following should be written in the rest of the page (the .md file after the second ---):

- Warnings - things people need to know to do this thing safely. These should go right at the top of the .md file so that people see these as soon as possible and don't miss them.
- Detailed description - on a more detailed/technical level, how it works
- Types - if there are different ways of doing the thing described in the article, what they are
- Availability - who this thing can be done by, what needs to be done before you can do it
- Cost - how much it costs, and if funding is available, how and where from

### Citing sources

The sources you are able to cite are in _bibliography/references.bib. If you want to add new sources, please discuss it in the Telegram channel.

To cite a source, use 
```
{% cite key %}
```
where key is the key specified in the references.bib file.

If you want to add a particular page number or range of page numbers, use
```
{% cite key --locator pagenumber %}
```
Further information on this can be found on the jekyll-scholar github page.

Make sure to include
```
{% bibliography --cited %}
```
at the end of the page to produce a bibliography if you have used any citations in the page. (TODO: fix this so you don't need to manually do it?)

### Sources

Where possible, use UK specific sources - e.g. prefer NHS guidelines over WPATH ones. Where possible, cite from open access journals instead of journals people need to pay to read.

The following are sources that are most reliable - use these wherever possible in preference to other sources:

- medicines.org.uk - PILs of medications - provide a link to medicines.org.uk and a date accessed if possible
- [RCPsych CR181 Good Practice Guidelines](http://www.rcpsych.ac.uk/files/pdfversion/CR181_Nov15.pdf)
- [Interim Gender Dysphoria Protocol and Service Guideline 2013-2014](https://www.england.nhs.uk/wp-content/uploads/2013/10/int-gend-proto.pdf)
- [Scottish Gender Reassignment Protocol](http://www.sehd.scot.nhs.uk/mels/CEL2012_26.pdf) and the [Interim update](http://www.ngicns.scot.nhs.uk/wp-content/uploads/2015/07/Gender-Reassignment-Interim-Guidance-2.pdf)
- [The Transgender Handbook](https://books.google.co.uk/books?id=ty3fAQAACAAJ)
- [Barrett et al. Transsexual and Other Disorders of Gender Identity](https://books.google.co.uk/books/about/Transsexual_and_Other_Disorders_of_Gende.html?id=I-8qZlGIpnQC) - fallax has a print copy of this
- [WPATH v7 Standards of Care](https://s3.amazonaws.com/amo_hub_content/Association140/files/Standards%20of%20Care%20V7%20-%202011%20WPATH%20(2)(1).pdf)
- [Endocrine Treatment of Transsexual Persons: An Endocrine Society Clinical Practice Guideline](https://academic.oup.com/jcem/article-lookup/doi/10.1210/jc.2009-0345)
- Review/survey papers from academic journals (*not* individual studies)

Some less good sources (use only if you can't find facts in the above sources):

- [Archive copy of NHS Wales doc describing gender services](https://uktrans.info/attachments/article/69/Specialies%20Services%20Policy%20Gender%20Services%20CP21%20Approved%20120925.pdf)
- [Archive copy of NHS NI doc describing gender services](https://uktrans.info/attachments/article/149/sfmhw_-_gender_dysphoria.pdf)

If you want to cite anywhere else, please discuss this with the project maintainers first so we can decide whether to add it to the list of approved sources.
