// @deno-types="npm:@types/aws-sdk"
import { S3Client, PutObjectCommand } from "npm:@aws-sdk/client-s3@3.712.0";
import { getSignedUrl } from "npm:@aws-sdk/s3-request-presigner@3.712.0";

const s3Client = new S3Client({
  region: Deno.env.get("AWS_REGION")!,
  credentials: {
    accessKeyId: Deno.env.get("AWS_ACCESS_KEY")!,
    secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
  },
});

Deno.serve(async (req) => {
  const file = await req.json();

  const putObjCmd = new PutObjectCommand({
    Bucket: Deno.env.get("AWS_BUCKET_NAME"),
    Key: file.fileUUID,
    ContentType: file.fileType,
  });

  const signedUrl = await getSignedUrl(s3Client, putObjCmd, {
    expiresIn: 60 * 5,
  });

  const responseData = {
    url: signedUrl,
    fileUUID: file.fileUUID,
  };

  return new Response(JSON.stringify(responseData), {
    headers: { "Content-Type": "application/json" },
  });
});
