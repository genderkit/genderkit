#!/bin/sh

cp detect-inactive-organisations.js ~
cd ~
npm install yamljs
nodejs ./detect-inactive-organisations.js