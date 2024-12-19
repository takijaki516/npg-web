import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { type NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";

import { getConfig } from "./config";

export class NPGLambdaStack extends cdk.Stack {
  private readonly config;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.config = getConfig();
    this.createCompute();
  }

  private createCompute() {
    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["@aws-sdk/*"],
      },
      environment: {},
      runtime: Runtime.NODEJS_20_X,
    };
  }
}
