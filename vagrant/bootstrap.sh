#!/bin/sh
echo "Running bootstrap script"
sudo apt-get update
sudo apt-get install -y git ruby ruby-dev make gcc dos2unix nodejs npm libcurl4-openssl-dev aspell aspell-en software-properties-common zlib1g-dev build-essential patch zlib1g-dev liblzma-dev libxslt1-dev imagemagick linux-headers-$(uname -r) build-essential dkms
gem install jekyll bundler rake
echo "Bootstrap script done."
echo "Virtual machine should now be set up - run 'vagrant ssh' to connect to it."
