---
title: finding words to describe yourself
weighting: 1
feature:
  image: labels.jpg
  caption: "Magnetic poetry words saying 'Who are you'"
  url: https://www.pexels.com/photo/text-cutouts-on-a-dotted-background-5941331/
  creator: 'Eva Bronzini'
  source: 'Pexels'
---

### How do I find words to describe myself?

You're allowed to be whoever you like. No-one can tell you who you are. Everyone is unique and is not fully described by any word or combination of words.

Sooner or later, however, you will find you will need to use words to describe yourself to other people. There are a number of common words used to describe people, which all have advantages and disadvantages. You can use your judgement to choose the most appropriate words to describe yourself. The words you use may vary depending on where you are and who you are describing yourself to.

These are some commonly used words. Click a word for more information on what the word means and when to use it.

<ul class="wordlist">
{% for word in site.words %}
<li><a href="{{ word.url | relative_url }}">{{ word.title }}</a></li>
{% endfor %}
</ul>

You can also create your own words to describe yourself that better fit who you are - even the most commonly used words have only been around a few decades at most, and more are being invented all the time!

### Words to avoid

{% capture warn %}
Remember when you are talking about other people to use the words they prefer. If you're not sure, ask.
{% endcapture %}
{% include warning warning=warn %}

Some words are commonly used as a slur - an offensive word used to insult or attack people. Some of these words may be upsetting or traumatic for people, and we strongly suggest you avoid using them. If you want to find out more about these words, you can [read our page about them]({% link slurs.md %}).

There are also words which are specific to a particular culture, such as [two spirit](https://en.wikipedia.org/wiki/Two-Spirit), [hijra](https://en.wikipedia.org/wiki/Hijra_(South_Asia)), or [kathoey](https://en.wikipedia.org/wiki/Kathoey). Because of the cultural context to these words, it is often better not to use them to describe yourself if you are not a member of said culture, as it may be considered [cultural appropriation](https://en.wikipedia.org/wiki/Cultural_appropriation). You can read more about these words on [the PBS website](https://www.pbs.org/independentlens/content/two-spirits_map-html/).

People from other cultures may not wish to be described as [transgender]({% link _words/transgender.md %}) or [nonbinary]({% link _words/nonbinary.md %}), because these words use a particular way of thinking about gender specific to [Western culture](https://en.wikipedia.org/wiki/Western_culture). Words like these may not correctly describe who the person is, or how they interact with the society around them.