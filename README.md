# ldap-api

AWS API for LDAP using API gateway and Lambda.

This repo is a template of a Node.js function for AWS Lambda that can be easily developed and tested on a local workstation and then uploaded as a Lambda function using scripts. Additional scripts provide for updating the Lambda function based on local code changes, and scheduling the function to run periodically.

The demo functionality of the lambda.js script uses the AWS JavaScript  API to interrogate AWS about running EC2 instances.

## Deploying

These instructions will get you setup to customize and deploy this functionality to your AWS account. They assume you are using a Mac/Linux workstation.

**Setup your environment**

1. [Install the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) on your system.
1. [Configure the AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) with credentials for your AWS account.
1. Install [jq](https://stedolan.github.io/jq/) onto your workstation.
1. Install Javascript and supprting libraries.
  1. Install [Node.js](https://nodejs.org/en/). This code was targeted against AWS Lambda support for Node.js 4.3.
  1. Install [NPM](https://www.npmjs.com/)
  1. Install supporting Javascript libraries (NPM modules):
    1. [aws-sdk](https://www.npmjs.com/package/aws-sdk)

**Customize and configure the code**

1. Download this repo to your local machine.
1. Create an S3 bucket or identify an existing bucket to hold the code to be deployed to Lambda.
  * The only permissions required for the bucket are whatever is needed for you to create and update objects in the bucket.
1. Create an IAM role to be assigned to the Lambda function.
  1. Go to IAM in the AWS console.
  1. Create a new role with a name of your choosing.
  1. In "Select Role Type", select "AWS Lambda" under "AWS Service Roles".
  1. Attach the following built-in policies:
    * AmazonEC2ReadOnlyAccess (required only for the sample functionality)
    * AWSLambdaBasicExecutionRole (required for the Lambda execute at all)
  1. And "Create Role"
1. Update the constants.sh file:
  1. Set the bucket name (S3BUCKET) and role ARN (LAMBDA_ROLE) to the values resulting from earlier configuration steps.
  1. Optionally change the schedule you wish to apply to your Lambda function. See http://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
  1. Optionally, update other names and labels.
1. Update lambda.js to implement the functionality you wish.

**Test your configuration**

1. Invoke lambda.js once locally, using the run-local.js wrapper:

 ```
 $ node run-local.js
 ```

**Create and configure the Lambda function**

1. Create the Lambda function:

 ```
 $ ./go-create.sh
 ```

2. Optionally, set a schedule for the function:

 ```
$ ./go-schedule.sh
 ```

3. Optionally, invoke the function the run in AWS immediately:

 ```  
 $ ./go-invoke.sh
 ```

4. Check the output of your Lambda function.
  1. In the AWS Console, navigate to your Lambda function.
  1. Click on the "Monitoring" tab.
  1. Click on the "View logs in CloudWatch" link.

**Update the Lambda function**

1. Whenever you change the lambda.js code, you will need to upload a new code package for Lambda to the S3 bucket and tell Lambda to get it.

 ```
 $ ./go-update.sh
 ```

## JavaScripts

**lambda.js** contains a Node.js script for executing in Lambda.

**run-local.js** will run that script on a local machine, instead of in AWS Lambda.

## bash Scripts

**constants.sh** constants required for the bash scripts. Note that this script does NOT supply constants for lambda.js.

**go-upload.sh** zips the local lambda.js script and supporting Javascript modules into a Lambda-compatible package of code and uploads it to S3. This script is called by other scripts here.

**go-create.sh** creates the Lambda function, pointing it to the uploaded code package in S3.

**go-schedule.sh**  create an CloudWatch rule to be evaulated on a schedule. It connects the Lambda function to the rule and adds the necessary permission to the Lambda function that allows the event to trigger the funciton.

**go-update.sh** Updates the Lambda function with the current version of the local lambda.js file.

**go-invoke.sh** allows you to manually invoke the lambda.js functionality on Lambda

**go-show-role.sh** shows the IAM role and policy assigned to the Lambda function

## Dependencies for Development

These scripts expect the following on your development workstation:

* [Node.js](https://nodejs.org/en/). This code was targeted against Lambda support for Node.js 4.3.
* [NPM](https://www.npmjs.com/)
* NPM modules:
  * [aws-sdk](https://www.npmjs.com/package/aws-sdk)
* [jq](https://stedolan.github.io/jq/)

## AWS Resource Dependencies

**S3.** These scripts expect an S3 bucket has already been created to use as the target for the Lambda code package. In running these scripts you need enough privileges on S3 of that bucket to create and update objects in it.

**IAM Role.** The IAM role referenced in these scripts is a role that attaches AWSLambdaBasicExecutionRole, AmazonEC2ReadOnlyAccess, and defines inline policies SendEmail, and StopStartTerminateEC2Instances. The scripts included in this repo DO NOT define these. You will have to create them yourself. Use the go-show-role.sh script to confirm that your role looks like the following:

```
$ ./go-show-role.sh
{
    "Role": {
        "AssumeRolePolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "sts:AssumeRole",
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "lambda.amazonaws.com"
                    }
                }
            ]
        },
        "RoleId": "AROAJYVR7QDYYPPKMX6RA",
        "CreateDate": "2016-06-23T15:09:07Z",
        "RoleName": "lambda-node-template",
        "Path": "/",
        "Arn": "arn:aws:iam::225162606092:role/lambda-node-template"
    }
}
{
    "AttachedPolicies": [
        {
            "PolicyName": "AmazonEC2ReadOnlyAccess",
            "PolicyArn": "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess"
        },
        {
            "PolicyName": "AWSLambdaBasicExecutionRole",
            "PolicyArn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        }
    ]
}
{
    "PolicyNames": []
}
```
