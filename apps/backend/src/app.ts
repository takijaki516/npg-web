import { Hono } from "hono";
import { cors } from "hono/cors";

import { initBetterAuth } from "./lib/auth";
import { usersRoute } from "./routes/users";
import { workoutsRoute } from "./routes/workout";
import { mealsRoute } from "./routes/meals";
import { presignRoute } from "./routes/presign";
import { infosRoute } from "./routes/info";
import { healthInfosRoute } from "./routes/health-info";
import { authMiddleware } from "./lib/auth-middleware";
import { intakeRoute } from "./routes/intake";
import { goalRoute } from "./routes/goal";
import { foodsRoute } from "./routes/foods";

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

    // CORS
    ALLOWED_ORIGIN: string;
  };
};

// Start a Hono app
export const app = new Hono<AppContext>();

app
  .use(
    "*",
    cors({
      origin: (_, c) => {
        return c.env.ALLOWED_ORIGIN;
      },
      allowHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin",
      ],
      allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PATCH", "PUT"],
      exposeHeaders: ["Content-Length"],
      // REVIEW:
      maxAge: 600,
      credentials: true,
    })
  )
  .on(["POST", "GET"], "/api/auth/**", async (c) => {
    const auth = initBetterAuth(c.env);
    return auth.handler(c.req.raw);
  });

export const routes = app
  .use(authMiddleware)
  .route("/user", usersRoute)
  .route("/goals", goalRoute)
  .route("/workouts", workoutsRoute)
  .route("/meals", mealsRoute)
  .route("/foods", foodsRoute)
  .route("/infos", infosRoute)
  .route("/intakes", intakeRoute)
  .route("/healthinfos", healthInfosRoute)
  .route("/presign", presignRoute);
