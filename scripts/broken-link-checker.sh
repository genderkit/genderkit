#!/bin/sh

cd ~
npm install broken-link-checker
blc https://genderkit.github.io/genderkit -rf > broken-link-checker-results.txt
echo "Results written to ~/broken-link-checker-results.txt."
echo "Done."