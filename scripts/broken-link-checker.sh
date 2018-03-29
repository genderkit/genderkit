#!/bin/sh

cd ~
mkdir broken-link-checker-results
npm install broken-link-checker
echo "Searching for broken links. This may take several minutes."
blc http://genderkit.github.io/genderkit/error/ -rfv --exclude "organisations" --exclude "publications" > broken-link-checker-results/main.txt
blc http://genderkit.github.io/genderkit/organisations/ -rfv > broken-link-checker-results/organisations.txt
blc http://genderkit.github.io/genderkit/publications/ -rfv > broken-link-checker-results/publications.txt
echo "Results written to ~/broken-link-checker-results/"
cat ~/broken-link-checker-results/* | grep BROKEN
echo "Done."
