---
layout: misc
title: UK helplines and advice
description: Where to get help in the UK as a trans, non-binary, gender variant, and intersex person
---
<section class="attention">
    <h3 id="in-immediate-danger">In immediate danger?</h3>
    <p>Phone 999. If you can't use a phone, use <a href="https://www.emergencysms.net/">emergencySMS</a> or Textphone 18000.</p>
</section>

### Get help

Use the links below to find helplines, information, and resources to help you handle your situation.

<ul class="wordlist">
{% for help in site.data.help %}
<li><a href="{{ help.url | relative_url }}">{{ help.title }}</a></li>
{% endfor %}
</ul>