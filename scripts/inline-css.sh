#!/bin/sh

lead='^<!-- External CSS -->$'
tail='^<!-- End External CSS -->$'
sed -e "/$lead/,/$tail/{ /$lead/{p; d
        }; /$tail/p; d }" $1 > ~/output.txt


lead='^<!-- Inline CSS -->$'
tail='^<!-- End Inline CSS -->$'
sed -e "/$lead/,/$tail/{ /$lead/{p; r _site/assets/css/css.css
        }; /$tail/p; d }" ~/output.txt > ~/output2.txt

cat ~/output2.txt > $1