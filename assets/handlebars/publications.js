(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['publications'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li class=\"searchItem\">\r\n        <div>\r\n            <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"image") : depth0), depth0))
    + "\" height=\"200\">\r\n            <a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</a>\r\n            <div class=\"publicationyear\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"organisation") : depth0), depth0))
    + "</div>\r\n            <div class=\"publicationyear\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"year") : depth0), depth0))
    + "</div>\r\n            <ul class=\"tags\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":16},"end":{"line":12,"column":25}}})) != null ? stack1 : "")
    + "            </ul>\r\n        </div>\r\n    </li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                <li class=\"tag\"><a>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</a></li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul class=\"details\" id=\"publications\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":16,"column":9}}})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});
})();