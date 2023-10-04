import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Api route for uploading files to S3
// A file is uploaded to the route as a form data object
export const PUT = async (req: Request, res: Response) => {
  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.ACCESS_KEY!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
    region: process.env.BUCKET_REGION!,
  });

  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: file.name,
      Body: buffer,
      ContentType: file.type,
    });
    await s3.send(command);
    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
