import { Auth } from "better-auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { initBetterAuth } from "lib/auth";

export type Bindings = {
  MY_BUCKET: R2Bucket;
  BUCKET_NAME: string;
  DATABASE_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
};

// access cloudflare workers env

// Start a Hono app
const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/", (c) => c.text("Hello dddWorld"));

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  const auth: Auth = initBetterAuth(c);
});

app.post("/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return c.json({ error: "No image provided" }, 400);
    }

    const filename = `${Date.now()}-${file.name}`;

    await c.env.MY_BUCKET.put(filename, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    return c.json({
      url: `https://${c.env.BUCKET_NAME}.r2.cloudflarestorage.com/${filename}`,
    });
  } catch (error) {
    return c.json({ error: "Upload failed" }, 500);
  }
});

app.post("/signup", async (c) => {
  const { email, password } = await c.req.json();
});

app.post("/login", async (c) => {});

app.post("/logout", async (c) => {});

app.post("/oauth/google", async (c) => {});

export default app;
