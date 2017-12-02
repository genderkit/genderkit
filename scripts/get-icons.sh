#!/bin/sh

cp /vagrant/git/genderkit/scripts/get-icons.js ~
cd ~
npm install yamljs
npm install download
nodejs ./get-icons.js