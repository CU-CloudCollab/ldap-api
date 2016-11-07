#!/usr/bin/env bash

# zip the code and upload it to S3

# setup environment
source ./constants.sh

# zip contents
zip -qr lambda-code.zip lambda.js node_modules/*

# load to S3
aws s3 cp ./lambda-code.zip s3://$S3BUCKET/$CODE_ZIPFILE
