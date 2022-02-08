abort('Please run this using `bundle exec rake`') unless ENV["BUNDLE_BIN_PATH"]
require 'html-proofer'
require 'rszr'

task :default => ["test"]

task :test => [:checkbibtex, :spellcheck, :htmlproofer] do
  puts "Tests complete."
end

task :resize160webp do
  sh "mkdir -p assets/images/articles/160webp"
  sh "mkdir -p assets/images/photos/160webp"
  files = FileList['assets/images/articles/original/*.jpg', 'assets/images/photos/original/*.jpg']
  files.each do |file|
    puts "Resizing #{file}..."
    target = file.gsub("original", "160webp").gsub("jpg","webp")
    Rszr::Image.load(file).resize!(160, 120).save(target)
  end
  puts "Image resize complete."
end

task :resize160 do
  sh "mkdir -p assets/images/articles/160"
  sh "mkdir -p assets/images/photos/160"
  files = FileList['assets/images/articles/original/*.jpg', 'assets/images/photos/original/*.jpg']
  files.each do |file|
    puts "Resizing #{file}..."
    target = file.gsub("original", "160")
    Rszr::Image.load(file).resize!(160, 120).save(target)
  end
  puts "Image resize complete."
end


task :resize240webp do
  sh "mkdir -p assets/images/articles/240webp"
  sh "mkdir -p assets/images/photos/240webp"
  files = FileList['assets/images/articles/original/*.jpg', 'assets/images/photos/original/*.jpg']
  files.each do |file|
    puts "Resizing #{file}..."
    target = file.gsub("original", "240webp").gsub("jpg","webp")
    Rszr::Image.load(file).resize!(240, 180).save(target)
  end
  puts "Image resize complete."
end

task :resize240 do
  sh "mkdir -p assets/images/articles/240"
  sh "mkdir -p assets/images/photos/240"
  files = FileList['assets/images/articles/original/*.jpg', 'assets/images/photos/original/*.jpg']
  files.each do |file|
    puts "Resizing #{file}..."
    target = file.gsub("original", "240")
    Rszr::Image.load(file).resize!(240, 180).save(target)
  end
  puts "Image resize complete."
end

task :resize600webp do
  sh "mkdir -p assets/images/articles/600webp"
  sh "mkdir -p assets/images/photos/600webp"
  files = FileList['assets/images/articles/original/*.jpg', 'assets/images/photos/original/*.jpg']
  files.each do |file|
    puts "Resizing #{file}..."
    target = file.gsub("original", "600webp").gsub("jpg","webp")
    Rszr::Image.load(file).resize!(600, 450).save(target)
  end
  puts "Image resize complete."
end

task :resize600 do
  sh "mkdir -p assets/images/articles/600"
  sh "mkdir -p assets/images/photos/600"
  files = FileList['assets/images/articles/original/*.jpg', 'assets/images/photos/original/*.jpg']
  files.each do |file|
    puts "Resizing #{file}..."
    target = file.gsub("original", "600")
    Rszr::Image.load(file).resize!(600, 450).save(target)
  end
  puts "Image resize complete."
end

task :resize => [:resize240, :resize600, :resize240webp, :resize600webp] do
  puts "Tests complete."
end

desc "Make sure all bibtex entries have urls, that there are no duplicates, and count the number of doi-less articles and incollections"
task :checkbibtex do
  require 'bibtex'
  b = BibTeX.open('_bibliography/references.bib')
  bad_entries = b['@entry[url!~.*]']
  bad_entries.each do |entry|
    puts "Found entry without url: #{entry.key}"
  end
  if bad_entries.length > 0 then
    exit 1
  else
    puts "No url-less bibtex entries found!"
    puts
  end
  if b.duplicates? then
    puts "Duplicate entries in bibtex found:"
    puts b.duplicates.map { |ds| ds.map { |d| d.key }.to_s }
    puts "Are these genuinely different?"
    puts
  end
  doiless = b['@article[doi!~.*], @incollection[doi!~.*]']
  if doiless.length > 0 then
    puts "Articles and incollections without doi:"
    puts doiless.map {|e| e.key}
    puts "Can any of these be given dois?"
  end
end

desc "Test for broken internal links"
task :checklinksinternal => :jekyll do
  options = {
    :assume_extension => true,
    :disable_external => true,
    :empty_alt_ignore => true,
    :alt_ignore => [ /.*/ ],
    :url_ignore => [ "https://github.com//issues", "https://www.uka.org.uk/EasysiteWeb/getresource.axd?AssetID=169662" ],
    :internal_domains => [ "genderkit.github.io", "127.0.0.1", "genderkit.org.uk" ],
    :url_swap => {
      /https?\:\/\/genderkit\.github\.io\/genderkit\// => "/",
      /\/?genderkit\// => "/"
    },
    :typhoeus => {
      :ssl_verifypeer => false,
      :ssl_verifyhost => 0,
      :timeout => 60
    }
  }
  HTMLProofer.check_directory("./_site", options).run
end

desc "Test for broken external links"
task :checklinks => :jekyll do
  options = {
    :assume_extension => true,
    :disable_external => false,
    :empty_alt_ignore => true,
    :alt_ignore => [ /.*/ ],
    :internal_domains => [ "genderkit.github.io", "127.0.0.1", "genderkit.org.uk" ],
    :url_ignore => [ "https://github.com//issues", "https://qtipcic.co.uk" ],
    :url_swap => {
      /https?\:\/\/genderkit\.github\.io\/genderkit\// => "/",
      /\/?genderkit\// => "/"
    },
    :typhoeus => {
      :ssl_verifypeer => false,
      :ssl_verifyhost => 0,
      :timeout => 60,
      :headers => {
        "User-Agent" => "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        "Accept" => '*/*'
      }
    }
  }
  HTMLProofer.check_directory("./_site", options).run
end

desc "Rewrite URLs in bibliography sections to be real links"
task :referencelinks do
  # Update bibliography sections to include real HTML links to sources
  files = FileList['_site/article/*/*.html','_site/resources/*/*.html','_site/*/*.html','_site/explore/*/*.html']
  files.each do |file_name|
    text = File.open(file_name, 'r'){ |file| file.read }
    if text.gsub!(/\[online\] Available from: ([^\s<]*)/, '<a href="\1">Link</a>')
      puts "rewriting #{file_name}..."
      File.open(file_name, 'w'){|file| file.write(text)}
    end
  end
end

desc "Convert icons from SVG to PNG"
task :converticons do
  files = FileList['assets/images/icons/svg/*.svg']
  files.each do |file|
    puts "Converting #{file}..."
    target = file.gsub("icons/svg/", "icons/")
    target = target.gsub(".svg", ".png")
    sh "inkscape --export-png=#{target} --export-width=128 --export-height=128 #{file}"
  end
end

desc "Convert logo from SVG to PNG"
task :convertlogo do
  files = FileList['assets/images/logo/logo.svg']
  files.each do |file|
    puts "Converting #{file}..."
    target = file.gsub(".svg", ".png")
    sh "inkscape --export-png=#{target} --export-width=768 --export-height=384 #{file}"
    Rszr::Image.load(target).save(target.gsub(".png", ".webp"))
    Rszr::Image.load(target).resize!(192,96).save(target.gsub(".png", "192.png"))
    Rszr::Image.load(target).resize!(192,96).save(target.gsub(".png", "192.webp"))
  end
end

desc "Convert illustrations from SVG to PNG and WEBP"
task :convertillustrations do
  files = FileList['assets/images/clothes/svg/*.svg']
  files.each do |file|
    puts "Converting #{file}..."
    target = file.gsub("clothes/svg/", "clothes/")
    target = target.gsub(".svg", ".png")
    sh "inkscape --export-png=#{target} --export-area-drawing -y 0 #{file}"
  end
end

desc "Build the site using Jekyll"
task :jekyll => :resize do
  sh "bundle exec jekyll build"
  Rake::Task["referencelinks"].invoke
end

desc "Test using proselint"
task :proselint => :jekyll do
  files = FileList['_articles/*.md', '_identities/*.md']
  files.each do |file|
    results = `proselint #{file}`
    if (results.length > 0)
      puts "In #{file}:"
      puts "#{results}"
    end
  end
end

class InternalLinkTrailingSlash < ::HTMLProofer::Check
  def run
    @html.css('a').each do |node|
      @link = create_element(node)
      if @link.internal? and not (@link.href.match(/\/(#.*)?$/) or @link.href[0] == "#" or @link.href.match(/\/.*\.pdf$/))
        return add_issue("No trailing slash on internal link #{@link.href}", line: node.line)
      end
    end
  end
end

class ProofHeaderIDs < ::HTMLProofer::Check
  def run
    @html.css('h1,h2,h3,h4,h5,h6').each do |node|
      @link = create_element(node)
      line = node.line

      if @link.id.nil?
        return add_issue("Heading has missing ID!", line: line)
      end
    end
  end
end

desc "Test the built html"
task :htmlproofer => :jekyll do
  options = {
    :assume_extension => true,
    :disable_external => true,
    :check_html => true,
    :validation => {
      :report_missing_names => true
    },
    :url_swap => {
      /(genderkit\.github\.io)?\/genderkit\// => "genderkit.github.io"
    },
    :internal_domains => [ "genderkit.github.io", "127.0.0.1", "genderkit.org.uk" ],
  }
  HTMLProofer.check_directory("./_site", options).run
end

def run_spellcheck(file)
  cmd = "cat #{file} | aspell -p './whitelist' -H -d en_GB --encoding utf-8 --rem-html-check=alt --lset-html-skip ol:script:style list | cat"
  result = `#{cmd}`
  result
end

def run_spellcheck_markdown(file)
  cmd = "cat #{file} | sed 's/image:.*//g' | sed 's/{%[^%]*%}//g' | aspell -p './whitelist' -M -d en_GB --encoding utf-8 list | cat"
  result = `#{cmd}`
  result
end

desc "Spellcheck using Aspell"
task :spellcheck => [:spellcheckmarkdown, :jekyll] do
  errors = 0
  files = FileList['_site/**/*.html']
  files.exclude("_site/books/*.html")
  files.exclude("_site/organisations/*.html")
  files.exclude("_site/publications/*.html")
  files.exclude("_site/studies/*.html")
  files.exclude("_site/credits/*.html")
  files.exclude("_site/tools/*")
  files.exclude("_site/explore/names-*/*.html")
  files.exclude("_site/resources/national/*.html")
  files.exclude("_site/resources/local/*.html")
  files.exclude("_site/resources/research/*.html")
  files.each do |file|
    results = run_spellcheck(file)
    if (results.length > 0)
      puts "Found spelling errors in #{file}:"
      puts results
      errors = errors + 1
    end
  end
  if errors > 0
    puts "Spelling errors found! If you believe these words are spelled correctly, add them to the file called 'whitelist'."
    exit 1
  else
    puts "No spelling errors found in built site."
  end
end

desc "Spellcheck markdown files using Aspell"
task :spellcheckmarkdown do
  errors = 0
  files = FileList['**/*.md']
  files.exclude("CONTRIBUTING.md")
  files.exclude("credits.md")
  files.each do |file|
    results = run_spellcheck_markdown(file)
    if (results.length > 0)
      puts "Found spelling errors in #{file}:"
      puts results
      errors = errors + 1
    end
  end
  if errors > 0
    puts "Spelling errors found! If you believe these words are spelled correctly, add them to the file called 'whitelist'."
    exit 1
  else
    puts "No spelling errors found in Markdown sources."
  end
end
