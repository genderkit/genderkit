#!/bin/sh

cp /vagrant/git/genderkit/scripts/archive-publications.js ~
cd ~
npm install yamljs slug date-format
nodejs ./archive-publications.js ~/archived-publications/
cd ~/archived-publications
for f in *.pdf; do convert -thumbnail 100x141 -quality 75 -extent 100x141 -gravity center -background white -alpha remove "$f"[0] "/vagrant/git/genderkit/assets/images/publications/${f%.pdf}.jpg"; done
cp "/vagrant/git/genderkit/assets/images/Gendered Intelligence - Trans Youth Sexual Health Booklet.jpg" "/vagrant/git/genderkit/assets/images/publications/"