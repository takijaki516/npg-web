import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { DateTime } from "luxon";
import { and, eq, gte, lt } from "drizzle-orm";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { authMiddleware, AuthMiddlewareContext } from "../lib/auth-middleware";

export const presignRoute = new Hono<AuthMiddlewareContext>()
  .use(authMiddleware)
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        key: z.string(),
        action: z.string(),
        fileType: z.string().optional(),
      })
    ),
    async (c) => {
      const user = c.get("user");
      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { key, action, fileType } = c.req.valid("json");

      const S3 = new S3Client({
        region: "auto",
        endpoint: `https://5badbdb2b6d089e76408f2b1c8ffec44.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: c.env.R2_ACCESS_KEY_ID,
          secretAccessKey: c.env.R2_SECRET_ACCESS_KEY,
        },
      });

      if (action === "PUT") {
        const putObjCmd = new PutObjectCommand({
          Bucket: c.env.BUCKET_NAME,
          Key: key,
          ContentType: fileType!,
        });

        const signedUrl = await getSignedUrl(S3, putObjCmd, {
          expiresIn: 60 * 5,
        });

        return c.json(
          {
            url: signedUrl,
            key: key,
          },
          201
        );
      }

      return c.json(
        {
          url: null,
          key: key,
        },
        201
      );
    }
  );
