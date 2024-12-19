import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  OAuthScope,
  ProviderAttribute,
  UserPool,
  UserPoolClient,
  UserPoolClientIdentityProvider,
  UserPoolDomain,
  UserPoolIdentityProviderGoogle,
  UserPoolOperation,
} from "aws-cdk-lib/aws-cognito";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { join } from "path";

import { getConfig } from "./config";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export class NPGCognitoStack extends cdk.Stack {
  public readonly userPool: UserPool;
  public readonly userPoolClient: UserPoolClient;
  public readonly userPoolDomain: UserPoolDomain;
  private readonly config;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.config = getConfig();

    // UserPool
    this.userPool = new UserPool(this, "CognitoUserPoolNPG", {
      userPoolName: "CognitoUserPoolNPG",
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      signInCaseSensitive: false,
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
    });

    this.userPool.addGroup("user", {
      groupName: "user",
      description: "Standard user group with limited access",
    });

    this.userPool.addGroup("admin", {
      groupName: "admin",
      description: "Admin group with full access",
    });

    // post signup lambda
    const postSignupLambda = new NodejsFunction(this, "PostSignupLambda", {
      entry: join(
        __dirname,
        "..",
        "src",
        "lambdas",
        "auth",
        "post-signup-lambda.ts"
      ),
      handler: "handler",
      runtime: Runtime.NODEJS_20_X,
    });

    this.userPool.addTrigger(
      UserPoolOperation.POST_CONFIRMATION,
      postSignupLambda
    );

    // google oauth secret
    const googleOAuthSecret = new Secret(this, "google-oauth-secret", {
      secretName: "google/oauth/credentials",
      description: "google oauth2 credentials",
      secretStringValue: cdk.SecretValue.unsafePlainText(
        JSON.stringify({
          GOOGLE_CLIENT_SECRET: this.config.GOOGLE_CLIENT_SECRET,
        })
      ),
    });

    // domain
    this.userPoolDomain = this.userPool.addDomain("CognitoDomain", {
      cognitoDomain: {
        domainPrefix: "npg-auth",
      },
    });

    // google provider
    const googleProvider = new UserPoolIdentityProviderGoogle(
      this,
      "GoogleProvider",
      {
        clientId: this.config.GOOGLE_CLIENT_ID,
        clientSecretValue: googleOAuthSecret.secretValueFromJson(
          "GOOGLE_CLIENT_SECRET"
        ),
        userPool: this.userPool,
        scopes: ["profile", "email", "openid"],
        attributeMapping: {
          email: ProviderAttribute.GOOGLE_EMAIL,
        },
      }
    );

    // user pool client
    this.userPoolClient = new UserPoolClient(this, "CognitoUserPoolClientNPG", {
      userPool: this.userPool,
      userPoolClientName: "CognitoUserPoolClientNPG",
      generateSecret: true,
      oAuth: {
        flows: { authorizationCodeGrant: true },
        scopes: [
          OAuthScope.OPENID,
          OAuthScope.COGNITO_ADMIN,
          OAuthScope.EMAIL,
          OAuthScope.PROFILE,
        ],
        // NOTE: for local development
        callbackUrls: ["http://localhost:7788/auth/callback"],
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.GOOGLE],
    });
  }
}
