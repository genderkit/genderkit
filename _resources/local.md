---
layout: page
title: Local groups in the UK
description: Local organisations, support groups, and social groups in the UK for trans, nonbinary, and gender non-conforming people
---
<main role="main">
  <nav>
    <h3>Jump to:</h3>
    <ul>
      {% for region in site.data.organisations.regions %}
        <li><a href="#{{ region | slugify }}">{{ region }}</a></li>
      {% endfor %}
    </ul>
  </nav> 
  <article>
    <section class="attention">
      <h3>Youth Groups</h3>
      <p>
        Looking for youth support groups? Find them on the <a href="https://www.theproudtrust.org/for-young-people/lgbt-youth-groups/where-can-i-find-a-youth-group/">Proud Trust</a> group finder. 
      </p>
    </section>
    <section>
        {% for region in site.data.organisations.regions %}
	  <h3 id="{{ region | slugify }}">{{ region }}</h3>
	  {% include organisations tag=region %}
	{% endfor %}
	</section>
  </article>
</main>
