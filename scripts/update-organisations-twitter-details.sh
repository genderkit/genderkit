#!/bin/sh

cp update-organisations-twitter-details.js ~
cd ~
npm install twitter-node-client
npm install yamljs
nodejs ./update-organisations-twitter-details.js