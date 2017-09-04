#!/bin/sh

# Before running this script you must have installed the AWS CLI.
# On ubuntu, do:
# 1) sudo apt-get install python-pip python-dev build-essential 
# 2) pip install --upgrade --user awscli
# 3) Set up the AWS credentials using aws configure

aws s3 sync s3://genderkit/logs ./logs/logfiles/
request-log-analyzer --no-progress --format amazon_s3 ./logs/logfiles/* --output html --file ./logs/log-analysis.html