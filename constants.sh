#!/usr/bin/env bash

##########################################################################
# Customize these values, according to how you configure your deployment.
#
# Name of the S3 bucket where Lambda function code will be uploaded to.
export S3BUCKET="cu-hackathon-2016-11-ldap"
#
# ARN of the role you created for the Lambda function to execute and
# implement policies.
export LAMBDA_ROLE="arn:aws:iam::101334791012:role/lambda-ldap-api"
#
# Arbitrary name for your Lambda function.
export LAMBDA_NAME="lambda-node-template-kps1"
#
##########################################################################

# AWS Lambda compatible schedule specification. E.g.,
# cron(5 * * * ? *) will invoke at 5 minutes after each hour.
# rate(5 minutes) will invole every 5 minutes.
# http://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
export LAMBDA_SCHEDULE='cron(5 * * * ? *)'

# Arbitrary name of the ZIP file to upload.
export CODE_ZIPFILE="lambda-code.zip"

# Names and IDs used for scheduling Lambda function.
export STATEMENT_ID="$LAMBDA_NAME-statement"
export SCHEDULE_RULE="$LAMBDA_NAME-rule"
