const accordionHeaders = document.querySelectorAll('.accordion-button');
Array.prototype.forEach.call(accordionHeaders, accordionHeader => {
  let target = accordionHeader.parentElement.nextElementSibling;
  accordionHeader.onclick = () => {
    let expanded = accordionHeader.getAttribute('aria-expanded') === 'true' || false;
    accordionHeader.setAttribute('aria-expanded', !expanded);
    if(expanded) {
      target.className = "accordion-panel-closed";
    } else {
      target.className = "accordion-panel-open";
    }
  }
})
