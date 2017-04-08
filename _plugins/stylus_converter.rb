# A Jekyll plugin to convert .styl to .css
# This plugin requires the stylus gem, do:
# $ [sudo] gem install stylus

# See _config.yml above for configuration options.

# Caveats:
# 1. Files intended for conversion must have empty YAML front matter a the top.
#    See all.styl above.
# 2. You can not @import .styl files intended to be converted.
#    See all.styl and individual.styl above.

module Jekyll
  class StylusConverter < Converter
    safe true

    def setup
      return if @setup
      require 'stylus'
      Stylus.compress = @config['stylus']['compress'] if
        @config['stylus']['compress']
      Stylus.paths << @config['stylus']['path'] if @config['stylus']['path']
      @setup = true
    rescue LoadError
      STDERR.puts 'You are missing a library required for Stylus. Please run:'
      STDERR.puts '  $ [sudo] gem install stylus'
      raise FatalException.new('Missing dependency: stylus')
    end

    def matches(ext)
      ext =~ /styl/i
    end

    def output_ext(ext)
      '.css'
    end

    def convert(content)
      begin
        setup
        Stylus.compile content
      rescue => e
        puts "Stylus Exception: #{e.message}"
      end
    end
  end
end
