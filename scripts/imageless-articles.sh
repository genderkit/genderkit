#!/bin/sh
echo "The following articles have no feature image:"
grep -L ^feature: _articles/* | xargs grep -h "title:"| cut -d' ' -f2- | sed -e s/\"//g
