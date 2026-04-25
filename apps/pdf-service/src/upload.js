import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.js";

export async function checkReceiptExists(key) {
  try {
    const command = new HeadObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
    });
    await r2.send(command);
    return true;
  } catch (error) {
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
      return false;
    }
    throw error;
  }
}
export async function uploadToR2({ key, buffer }) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET, 
    Key: key,
    Body: buffer,
    ContentType: "application/pdf",
  });

  await r2.send(command);

  return `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET}/${key}`;
}