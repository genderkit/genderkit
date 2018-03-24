#!/bin/sh

cp archive-organisation-webpages.js ~
cd ~
npm install yamljs slug date-format
nodejs ./archive-organisation-webpages.js