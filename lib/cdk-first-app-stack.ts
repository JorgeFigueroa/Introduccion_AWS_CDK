//import * as cdk from 'aws-cdk-lib';
//import {Construct} from 'constructs';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw from '@aws-cdk/aws-apigateway';
import {Lambda} from "aws-cdk-lib/aws-ses-actions";
import * as path from "path";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkFirstAppStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // DynamoDB table definition
        const gretingsTable = new dynamodb.Table(this, "GreetingTable", {
            partitionKey: {name: "id", type: dynamodb.AttributeType.STRING}
        })


        // lambda function
        const saveHelloFunction = new lambda.Function(this, "SaveHelloFunction", {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'handler.saveHello',
            code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambda')),
            environment: {
                GREETINGS_TABLE: gretingsTable.tableName,
            }
        });


        const getHelloFunction = new lambda.Function(this, "GetHelloFunction", {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'handler.getHello',
            code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambda')),
            environment: {
                GREETINGS_TABLE: gretingsTable.tableName,
            }
        })


        gretingsTable.grantReadWriteData(saveHelloFunction);
        gretingsTable.grantReadData(getHelloFunction)


        const helloAPI = new apigw.RestApi(this, "helloApi")
        helloAPI.root
            .resourceForPath("hello")
            .addMethod("POST", new apigw.LambdaIntegration(saveHelloFunction));

        helloAPI.root
            .resourceForPath("hello")
            .addMethod("GET", new apigw.LambdaIntegration(getHelloFunction));

    }
}
