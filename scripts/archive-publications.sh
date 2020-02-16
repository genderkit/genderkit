#!/bin/sh

cp /vagrant/git/genderkit/scripts/archive-publications.js ~
cd ~
npm install yamljs slug date-format
nodejs ./archive-publications.js
