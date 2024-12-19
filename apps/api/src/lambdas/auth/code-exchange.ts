import {
  type APIGatewayProxyEvent,
  type APIGatewayProxyResult,
} from "aws-lambda";

const { COGNITO_DOMAIN, COGNITO_APP_CLIENT_ID, COGNITO_APP_CLIENT_SECRET } =
  process.env;

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // const { queryStringParameters, headers } = event;
    // const code = queryStringParameters?.code;
    // const origin = headers.origin || headers.Origin;

    // if (!code) {
    //   const error = queryStringParameters?.error;
    //   return {
    //     statusCode: 400,
    //     body: JSON.stringify({ error: error || "Unknown error" }),
    //   };
    // }

    // const authorizationHeader = `Basic ${Buffer.from(
    //   `${COGNITO_APP_CLIENT_ID}:${COGNITO_APP_CLIENT_SECRET}`
    // ).toString("base64")}`;

    // const requestBody = new URLSearchParams({
    //   grant_type: "authorization_code",
    //   client_id: COGNITO_APP_CLIENT_ID as string,
    //   code: code,
    //   redirect_uri: `${origin}/auth/callback`,
    // });

    // const res = await fetch(`${COGNITO_DOMAIN}/oauth2/token`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: authorizationHeader,
    //   },
    //   body: requestBody,
    // });

    // const data = await res.json();

    // if (!res.ok) {
    //   return {
    //     statusCode: res.status,
    //     body: JSON.stringify({
    //       error: data.error,
    //       error_description: data.error_description,
    //     }),
    //   };
    // }

    const { body, pathParameters, path, queryStringParameters, headers } =
      event;
    console.log("🚀 ~ file: code-exchange.ts:58 ~ body:", body);
    console.log(
      "🚀 ~ file: code-exchange.ts:58 ~ pathParameters:",
      pathParameters
    );
    console.log("🚀 ~ file: code-exchange.ts:58 ~ path:", path);
    console.log(
      "🚀 ~ file: code-exchange.ts:58 ~ queryStringParameters:",
      queryStringParameters
    );

    console.log("🚀 ~ file: code-exchange.ts:69 ~ headers:", headers);
    console.log("DOES IT CRASH");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Code exchange successful",
      }),
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Credentials": "true",
      },
    };

    // Instead of cookies, return tokens in response
    // The frontend will need to handle storing these
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     id_token: data.id_token,
    //     access_token: data.access_token,
    //     refresh_token: data.refresh_token,
    //   }),
    //   headers: {
    //     "Access-Control-Allow-Origin": origin || "*",
    //     "Access-Control-Allow-Credentials": "true",
    //   },
    // };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
};
