import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  RestApi,
  LambdaIntegration,
  TokenAuthorizer,
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";
import { Runtime } from "aws-cdk-lib/aws-lambda";

import { type NPGCognitoStack } from "./cognito-stack";
import { type NPGLambdaStack } from "./lambda-stack";

export class NPGApiGateWayStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    cognitoStack: NPGCognitoStack,
    lambdaStack: NPGLambdaStack,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);
    this.createRestApiGateway(cognitoStack, lambdaStack);
  }

  private createRestApiGateway(
    cognitoStack: NPGCognitoStack,
    lambdaStack: NPGLambdaStack
  ) {
    const api = new RestApi(this, "RestApiGateway", {
      restApiName: "RestApiGateway",
      description: "Rest Api Gateway for the NPG API",
    });

    // const adminAuthorizerLambda = new NodejsFunction(
    //   this,
    //   "AdminAuthorizerLambda",
    //   {
    //     functionName: "AdminAuthorizerLambda",
    //     entry: join(
    //       __dirname,
    //       "..",
    //       "src",
    //       "lambdas",
    //       "auth",
    //       "admin-authorizer.ts"
    //     ),
    //     handler: "handler",
    //     runtime: Runtime.NODEJS_20_X,
    //     environment: {
    //       USER_POOL_ID: cognitoStack.userPool.userPoolId,
    //       CLIENT_ID: cognitoStack.userPoolClient.userPoolClientId,
    //     },
    //   }
    // );

    // const userAuthorizerLambda = new NodejsFunction(
    //   this,
    //   "UserAuthorizerLambda",
    //   {
    //     functionName: "UserAuthorizerLambda",
    //     entry: join(
    //       __dirname,
    //       "..",
    //       "src",
    //       "lambdas",
    //       "auth",
    //       "user-authorizer.ts"
    //     ),
    //     handler: "handler",
    //     runtime: Runtime.NODEJS_20_X,
    //     environment: {
    //       USER_POOL_ID: cognitoStack.userPool.userPoolId,
    //       CLIENT_ID: cognitoStack.userPoolClient.userPoolClientId,
    //     },
    //   }
    // );

    // const adminAuthorizer = new TokenAuthorizer(this, "AdminAuthorizer", {
    //   handler: adminAuthorizerLambda,
    //   authorizerName: "AdminAuthorizer",
    //   identitySource: "method.request.header.Authorization",
    // });

    // const userAuthorizer = new TokenAuthorizer(this, "UserAuthorizer", {
    //   handler: userAuthorizerLambda,
    //   authorizerName: "UserAuthorizer",
    //   identitySource: "method.request.header.Authorization",
    // });

    const codeExchangeLambda = new NodejsFunction(this, "CodeExchangeLambda", {
      functionName: "CodeExchangeLambda",
      entry: join(
        __dirname,
        "..",
        "src",
        "lambdas",
        "auth",
        "code-exchange.ts"
      ),
      handler: "handler",
      runtime: Runtime.NODEJS_20_X,
      environment: {
        COGNITO_DOMAIN: cognitoStack.userPoolDomain.domainName,
        COGNITO_APP_CLIENT_ID: cognitoStack.userPoolClient.userPoolClientId,
        COGNITO_APP_CLIENT_SECRET:
          cognitoStack.userPoolClient.userPoolClientSecret.unsafeUnwrap(),
      },
    });

    api.root
      .addResource("auth")
      .addResource("callback")
      .addMethod("GET", new LambdaIntegration(codeExchangeLambda));
  }
}
