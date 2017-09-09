#!/bin/sh

cd ~
npm install broken-link-checker
echo "Searching for broken links. This may take several minutes."
blc https://genderkit.github.io/genderkit -rf > broken-link-checker-results.txt
mv ~/broken-link-checker-results.txt /vagrant/
echo "Results written to /vagrant/broken-link-checker-results.txt"
cat /vagrant/broken-link-checker-results.txt | grep BROKEN
echo "Done."
