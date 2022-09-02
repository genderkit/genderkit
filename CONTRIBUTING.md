# Contributing

Hi! We're really glad you are interested in contributing to Gender Construction Kit!

First, something really important:

**Any contributions you make to the articles on this website will be made available under the [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) license.**

Here's how to do some common things:

- to add a new organisation to the organisations list, edit the _data/organisations.yml file.
- to add a new organisation to the publications list, edit the _data/publications.yml file.
- if you want to change the "What effects does it have?", "What is it?" or "How long does it last?" sections of an article, look in _data/articles/ for a file with the same name as the article - that's where you find that stuff.

If you need help, message us on Twitter or Facebook and we can help get you started. We'd be really excited to hear from you!

### How do I get my hard work credited?

Your work will appear on the credits page if you add an entry for yourself [to this file](https://github.com/genderkit/genderkit/blob/master/_data/credits.yml).

### I'm not a coder - how do I contribute to the site?

1. Make yourself a GitHub account and log in to GitHub.
2. Open the [genderkit repository](https://github.com/genderkit/genderkit) on GitHub.
3. Press the "Fork" button (normally in the top right)
4. Press the big green "Create Fork" button.
5. You now have your own version of the site that you can make changes to. Find the files you want to change, and when you want to make a change, use the edit (pencil) button to start making changes.
6. When you've made your updates to the file, use the "Commit changes" button at the bottom of the page to save your changes.

### I can code - how do I do development for the site?

Want to write some code? Please read [Local Development](https://github.com/genderkit/genderkit/wiki/Local-development) on the wiki for instructions on how to set up a local installation of the website for testing. If you're looking for some jobs to do, check out the [issues list](https://github.com/genderkit/genderkit/issues) for ideas.

Continuous integration is done using GitHub Actions. Broken links or spelling errors in the website will cause the build to fail!

## Writing articles

### Style

Whereever possible, try and use the following style:

- Rather than saying "people with x" say "If you have x" or "If you experience x"
- Rather than saying "patients" say "you"
- Rather than using brand names (e.g. Viagra) use the actual chemical name where possible, then add brand names in brackets afterwards if it will help the reader
- If you can find any further information from NHS Choices, a government webpage, or a gender clinic, include the link at the bottom of the article. (TODO: should we have a special graphic style to highlight this?)
- Links to external sources should be of the form "on [the XYZ website]" or "on [the XYZ page]"; note that the word "the" goes in the link. The only exception to this is if there is more than one link, such as "on the [ABC] and [XYZ] websites".

Unless there is a good reason not to, articles should use headings from the following list, in order:
- What is [name]?, What does [name] do?, Who can have [name]?, How long does [name] last?

  Automatically generated from the data file for the article. If you need a different phrasing of [name] from the article title, you can specify that in the data file under "in-headings:". If you need the plural versions of these phrases (what are, what do, how long do) you can specify "plural: true" in the data.
- How do I stay safe?

  For safety advice. Anything that might go wrong that can be mitigated for in some way.
- What should I be aware of?

  For potential problems or contraindications, or if we're specifically advising against doing it. We should only advise against doing something if there are good alternatives to doing it and there are medical reasons to avoid it; it's not our place to decide whether people should want X or Y effect, only to help them find a safe way to achieve it.
- Who might want [name]?

  Different sorts of people who might want the thing, to help readers work out if it's relevant to them. Some articles make more sense in a pros/cons style, in which case we usually don't use this heading.
- Why might I want [name]?

  For pros in a pros/cons style article.
- Why might I not want [name]?

  For cons in a pros/cons style article.
- Are there other options?

  For alternative ways to achieve a similar result. 
- How do I do/use/get [name]?

  Instructions or advice on how to access or use a particular treatment or technique. Any information about eligibility requirements will go here.
- What kinds are there?

  Discussion of the different types of whatever this thing is, if it comes in multiple variants.
- How do I get ready for surgery?

  How to prepare for surgery; usually will just contain the same text as in e.g. hysterectomy
- More information

  Further detail, scientific citations or anything else that's generally not essential info but may be of interest to some people.
- What else might I want?

  Other things you're likely to want if you're doing whatever the article is about.

These headings are a rough guideline. Not all articles will have all of these headings, but it can be a good exercise to think about these things to make sure you've covered as much of the necessary information as possible. Try to avoid overly long sections; if you can come up with more headings to break up the page into more easily-digestible chunks, do so.

### Articles about chemical/medical/surgical interventions

- Include information about typical recovery times if appropriate and a reminder about how this may affect education or employment, and how much help they may require during recovery
- Include information about the most common side effects and risks, and information about where to find more information about these. For very common side effects, if there are methods to mitigate these, describe them. Describe risks in terms of percentages of people (e.g. "1.5% of people who have this surgery"), rather descriptions of probability like"1 in x" or descriptive words.
- If there is a more commonly used alternative treatment, or the number of alternatives is three or less, list them. 
- Are there any specialist organisations/groups that can provide further advice and information?

### What should articles have in them?

The following should be in the frontmatter (the stuff between the --- and the --- at the top of the .md file):

- Page title (the main name it is called by. This should start with a captial letter but have no other capitals)
- Page illustration - Pictures must have a public domain license, and ideally you should have taken the picture yourself. If you are not sure, ask in the Telegram channel. Do not use pictures found on a normal Google search. If you include a picture, you *must* include a caption - we need this so that blind/partially sighted users still know what the image is a picture of. 

The following should be in the data file (.yml in _data/articles/):

- Summary - a brief one sentence summary of what the treatment/activity is and what it is meant to do (as brief as possible). (Don't end this in a full stop, please!)
- AKA - other names that the treatment/activity might be known by. If more than one name, put commas between them.
- Effects - list of effects that the treatment/activity has - i.e. what it changes. Make sure that for each effect, you link it to a category from the file _data/categories.yml. End the description of each effect with a full stop.
  Each effect should be written in the *present tense*. For example, 'Body hair: permanently removes' rather than 'Permanently removed' or 'Permanent removal'. A good way to check this is to try saying the name of the treatment before the effect, and see if it makes sense. '[Waxing] permanently removes [body hair]' rather than '[Waxing] permanent removal [body hair]'.
- Duration - A description of how long the thing lasts. Nake sure that if this article is about something with permanent, irreversable effects, you say so. End the duration description with a full stop.
- Scope - You should include an item in the yaml file labelled `age_specific` or `region_specific` if the subject of the article is applicable only to certain age groups or in certain regions. The text of these items should be a brief explanation of the age or region restrictions, ended with a full stop.
- Requirements - list of requirements that the treatment has. Each one must have a `type` that links to an entry in _data/requirements.yml, and optionally a `detail` that explains the specifics of the requirement. Requirements without a `detail` will get the default text listed in _data/requirements.yml.

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
- [RCPsych CR181 Good Practice Guidelines](https://www.rcpsych.ac.uk/docs/default-source/improving-care/better-mh-policy/college-reports/cr181-good-practice-guidelines-for-the-assessment-and-treatment-of-adults-with-gender-dysphoria.pdf)
- [Interim Gender Dysphoria Protocol and Service Guideline 2013-2014](https://www.bathandnortheastsomersetccg.nhs.uk/assets/uploads/2019/08/NHS-England-Interim-Gender-Dysphoria-Protocol.pdf)
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
