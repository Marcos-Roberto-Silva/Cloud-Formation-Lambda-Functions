import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodeJs from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs"; 

export class ProductAppStack extends cdk.Stack {
    readonly productsFetchHandler: lambdaNodeJs.NodejsFunction;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        this.productsFetchHandler = new lambdaNodeJs.NodejsFunction(this, 
            "ProductsFetchFunction", {
                runtime: lambda.Runtime.NODEJS_20_X,
                memorySize: 512,
                functionName: "ProductsFetchFunction",
                entry: "lambda/products/productsFunction.ts",
                handler: "handler",
                timeout: cdk.Duration.seconds(10),
                bundling: {
                    minify: true,
                    sourceMap: false,
                },
        });
    }
}