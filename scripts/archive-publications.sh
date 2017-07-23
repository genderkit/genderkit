#!/bin/sh

cp archive-publications.js ~
cd ~
npm install yamljs slug date-format
nodejs ./archive-publications.js