#!/bin/sh
echo "The following articles have a title that starts with a capital letter:"
grep -h "title:" _articles/* | cut -d' ' -f2- | sed -e s/\"//g | grep -e ^[A-Z]
