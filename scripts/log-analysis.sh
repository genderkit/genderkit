#!/bin/sh

# Before running this script you must have installed the AWS CLI.
# On ubuntu, do:
# 1) sudo apt-get install python-pip python-dev build-essential 
# 2) pip install --upgrade --user awscli
# 3) Set up the AWS credentials using aws configure
#
# You will also need to install request-log-analyzer:
# gem install request-log-analyzer

echo "Downloading request log files..."
aws s3 sync s3://genderkit/logs ./logs/logfiles/

echo "Concatenating logs..."
cat ./logs/logfiles/* > ./logs/concatenated.txt

echo "Generating report..."
request-log-analyzer --no-progress --format amazon_s3 ./logs/concatenated.txt --output html --file ./logs/log-analysis.html

echo "Done."