abort('Please run this using `bundle exec rake`') unless ENV["BUNDLE_BIN_PATH"]
require 'html-proofer'

desc "Test the built html"
task :test do
  sh "bundle exec jekyll build"
  options = {
    :assume_extension => true,
    :disable_external => true,
    :check_html => true,
    :validation => {
      :report_missing_names => true,
      :report_script_embeds => true
    },
    :url_swap => {
      /^\/genderkit\// => "/"
    },
    :internal_domains => [ "genderkit.github.io" ],
  }
  HTMLProofer.check_directory("./_site", options).run
end
