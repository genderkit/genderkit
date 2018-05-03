#!/bin/sh

cat ./logs/concatenated.txt | grep -v -f "/vagrant/git/genderkit/scripts/botwhitelist.txt" > ./logs/botsonly.txt
