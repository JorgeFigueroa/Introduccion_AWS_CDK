# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template




### INIT INSTALL
* nvm use 16.13.2
* npm install -g aws-cdk
* cdk --version
* cdk bootstrap aws://ID_ACCOUNT/eu-west-1
* cdk init --language typescript

### INSTALL DEPENDENCY
* npm install @aws-cdk/aws-lambda
* npm install @aws-cdk/aws-dynamodb
* npm install @aws-cdk/aws-apigateway


* npm run build
* cdk synth  #crea la cartella cdk.out che contiene json di cloudformation compilado
* cdk deploy
