#!/bin/sh

cp /vagrant/git/genderkit/scripts/get-icons.js ~
cd ~
mkdir ~/organisation-icons/
npm install yamljs
npm install download
nodejs ./get-icons.js