import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { S3GetObjPresignRequest } from "@/components/daily-meals/daily-food";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const { fileUUID }: S3GetObjPresignRequest = await req.json();

  const getObjCmd = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: fileUUID,
  });

  const signedUrl = await getSignedUrl(s3Client, getObjCmd, {
    expiresIn: 60 * 15,
  });

  return NextResponse.json({
    url: signedUrl,
    fileUUID,
  });
}

export interface S3GetObjPresignResponse {
  url: string;
  fileUUID: string;
}
