#!/bin/sh
grep -rhI "###" _articles/* | sort | uniq --all-repeated=separate -w12 | uniq -c
