require "jekyll"
require "nokogiri"

module Jekyll
  class SectionDivs
    class << self
      def sectiondivs(doc)
        html_doc = Nokogiri::HTML(doc.output)
        body = html_doc.at_css('.bodytext')
        if !body then return end
        current_section = Nokogiri::XML::NodeSet.new(html_doc)
        last_heading = nil
        for elem in body.children
          if elem.element? and elem.name == "h3" then
            if !last_heading.nil? then
              div = html_doc.create_element "div"
              div.children=current_section
              elem.add_previous_sibling(div)
              div['aria-labelledby']=last_heading['id'] << "-button"
              div['id']=last_heading['id'] << "-panel"
              div['class']='accordion-panel'
            end
            elem['class']='accordion-heading'
            button = html_doc.create_element "button"
            status = html_doc.create_element "span"
            status['class']="status"
            button.children = status
            button.children += elem.children
            elem.children = button
            button['id']=elem['id'] << "-button"
            button['aria-expanded']="true"
            button['aria-controls']=elem['id'] << "-panel"
            button['class']="accordion-button"
            last_heading=elem
            current_section = Nokogiri::XML::NodeSet.new(html_doc)
          else
            current_section.push(elem)
          end 
        end
        div = html_doc.create_element "div"
        div.children=current_section
        last_heading.add_next_sibling(div)
        div['aria-labelledby']=last_heading['id']
        div['id']=last_heading['id'] << "-panel"
        div['class']='accordion-panel-open'
        doc.output = html_doc.to_html
      end
    end
  end
end
Jekyll::Hooks.register :documents, :post_render do |doc|
  Jekyll::SectionDivs.sectiondivs(doc)
end
