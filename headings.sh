#!/bin/sh
grep -rhI "###" _articles/* | sort | uniq -c | sort -n
