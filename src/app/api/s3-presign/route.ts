import { S3PresignRequest } from "@/components/add-meals-dialog/add-meal-dialog";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const file: S3PresignRequest = await req.json();

  const putObjCmd = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: file.fileUUID,
    ContentType: file.fileType,
  });

  const signedUrl = await getSignedUrl(s3Client, putObjCmd, {
    expiresIn: 60 * 5,
  });

  return NextResponse.json({
    url: signedUrl,
    fileUUID: file.fileUUID,
  });
}

export type S3PresignResponse =
  | {
      failure: true;
      url: null;
      fileUUID: string;
    }
  | {
      failure: null;
      url: string;
      fileUUID: string;
    };
