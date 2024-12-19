#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { NPGApiGateWayStack } from "../lib/api-gateway-stack";
import { NPGCognitoStack } from "../lib/cognito-stack";
import { NPGLambdaStack } from "../lib/lambda-stack";

const app = new cdk.App();

const cognitoStack = new NPGCognitoStack(app, "NPGCognitoStack-Dev");
const lambdaStack = new NPGLambdaStack(app, "NPGLambdaStack-Dev");
const apiGatewayStack = new NPGApiGateWayStack(
  app,
  "NPGApiGateWayStack-Dev",
  cognitoStack,
  lambdaStack
);
