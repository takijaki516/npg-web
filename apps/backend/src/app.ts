import { Hono } from "hono";
import { cors } from "hono/cors";

import { initBetterAuth } from "./lib/auth";
import { usersRoute } from "./routes/users";
import { weightsRoute } from "./routes/weights";
import { mealsRoute } from "./routes/meals";
import { aiRoute } from "./routes/ai";
import { presignRoute } from "./routes/presign";

export type AppContext = {
  Bindings: {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    NODE_ENV: string;
    GOOGLE_GENERATIVE_AI_API_KEY: string;

    // R2 Bucket
    MY_BUCKET: R2Bucket;
    BUCKET_NAME: string;
    R2_ACCESS_KEY_ID: string;
    R2_SECRET_ACCESS_KEY: string;
  };
};

// Start a Hono app
export const app = new Hono<AppContext>();

// REVIEW:
app
  .use(
    "*",
    cors({
      origin: ["http://localhost:5173", "http://localhost:4173"],
      allowHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin",
      ],
      allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PATCH", "PUT"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  )
  .on(["POST", "GET"], "/api/auth/**", async (c) => {
    const auth = initBetterAuth(c.env);
    return auth.handler(c.req.raw);
  });

export const routes = app
  .route("/user", usersRoute)
  .route("/weights", weightsRoute)
  .route("/meals", mealsRoute)
  .route("/ai", aiRoute)
  .route("/presign", presignRoute);
