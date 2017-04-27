#!/bin/sh

bundle exec jekyll build --config _config-live.yml
aws s3 sync ./_site/ s3://genderkit.org.uk/