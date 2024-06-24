import * as lambdaNodeJs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as cwlogs from "aws-cdk-lib/aws-logs";
import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";

interface ECommerceApiStackprops extends cdk.StackProps {
    productsFetchHandler: lambdaNodeJs.NodejsFunction
}

export class ECommerceApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: ECommerceApiStackprops) {
        super(scope, id, props)

        const api = new apiGateway.RestApi(this, "ECommerceApi", {
            restApiName: "ECommerceApi"
        })

        const productsFetchIntegration =  new apiGateway.LambdaIntegration(props.productsFetchHandler);

        const productsResource = api.root.addResource("products");
        productsResource.addMethod("GET", productsFetchIntegration)
    }
}