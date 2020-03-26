(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['publications'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li class=\"searchItem "
    + alias4(((helper = (helper = lookupProperty(helpers,"kind") || (depth0 != null ? lookupProperty(depth0,"kind") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"kind","hash":{},"data":data,"loc":{"start":{"line":3,"column":26},"end":{"line":3,"column":34}}}) : helper)))
    + "\">\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image") || (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data,"loc":{"start":{"line":4,"column":18},"end":{"line":4,"column":27}}}) : helper)))
    + "\">\r\n        <div class=\"searchDetails\">\r\n            <a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":6,"column":21},"end":{"line":6,"column":28}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":6,"column":30},"end":{"line":6,"column":39}}}) : helper)))
    + "</a>\r\n            <div class=\"attributions\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"details") || (depth0 != null ? lookupProperty(depth0,"details") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"details","hash":{},"data":data,"loc":{"start":{"line":7,"column":38},"end":{"line":7,"column":49}}}) : helper)))
    + "</div>\r\n            <ul class=\"tags\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":16},"end":{"line":11,"column":25}}})) != null ? stack1 : "")
    + "            </ul>\r\n        </div>\r\n    </li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <li class=\"tag\"><a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</a></li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul class=\"results\" id=\"publications\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":15,"column":9}}})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});
})();