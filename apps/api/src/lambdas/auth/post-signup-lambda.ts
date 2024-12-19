import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  AdminAddUserToGroupCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

export const handler = async (event: any) => {
  try {
    const { userPoolId, userName } = event;
    const input: AdminAddUserToGroupCommandInput = {
      UserPoolId: userPoolId,
      Username: userName,
      GroupName: "user",
    };

    const command = new AdminAddUserToGroupCommand(input);

    await client.send(command);
  } catch (error) {
    console.error();
  }
};
