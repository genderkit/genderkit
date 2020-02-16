abort('Please run this using `bundle exec rake`') unless ENV["BUNDLE_BIN_PATH"]
require 'html-proofer'

task :default => ["test"]

task :test => [:spellcheck, :htmlproofer] do
  puts "Tests complete."
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
    :url_ignore => [ "https://github.com//issues" ],
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

desc "Build the site using Jekyll"
task :jekyll do
  sh "bundle exec jekyll build"
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
  cmd = "cat #{file} | aspell -p './whitelist' -H -d en_GB --encoding utf-8 --lset-html-skip ol:script list | cat"
  result = `#{cmd}`
  result
end

desc "Spellcheck using Aspell"
task :spellcheck => :jekyll do
  errors = 0
  files = FileList['_site/**/*.html']
  files.exclude("_site/books/*.html")
  files.exclude("_site/organisations/*.html")
  files.exclude("_site/publications/*.html")
  files.exclude("_site/studies/*.html")
  files.exclude("_site/credits/*.html")
  files.exclude("_site/tools/*")
  files.exclude("_site/explore/names-*/*.html")
  files.exclude("_site/resources/*/*.html")
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
    puts "No spelling errors found."
    exit 0
  end
end
