#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ProductsAppStack} from "../lib/ProductsApp-stack";
import {ECommerceApiStack} from "../lib/e-commerceApi-stack";

const app = new cdk.App();

const env:  cdk.Environment = {
  account: "767397861446",
  region: "sa-east-1"
}

const tags = {
  cost: "ECommerce",
  team: "SelfOwner"
}

const productsAppStack = new ProductsAppStack(app, "productsApp", {
  tags: tags,
  env: env
});

const eCommerceApiStack = new ECommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags: tags,
  env: env
});

eCommerceApiStack.addDependency(productsAppStack);