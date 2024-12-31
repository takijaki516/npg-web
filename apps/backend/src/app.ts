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

app
  .use(
    "*",
    cors({
      origin: "http://localhost:5173",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
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

// app.post("/upload", async (c) => {
//   try {
//     const formData = await c.req.formData();
//     const file = formData.get("image") as File;

//     if (!file) {
//       return c.json({ error: "No image provided" }, 400);
//     }

//     const filename = `${Date.now()}-${file.name}`;

//     await c.env.MY_BUCKET.put(filename, file.stream(), {
//       httpMetadata: { contentType: file.type },
//     });

//     return c.json({
//       url: `https://${c.env.BUCKET_NAME}.r2.cloudflarestorage.com/${filename}`,
//     });
//   } catch (error) {
//     return c.json({ error: "Upload failed" }, 500);
//   }
// });
