import { DeleteObjectCommand, GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client, ServiceOutputTypes } from "@aws-sdk/client-s3";
import { basename } from "path";

export function Client() {
  return new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!
    }
  });
}

export type PageFile = {
  body: any,
  type?: string;
  size?: number;
  encoding?: string;
  Key: string;
  filename: string;
  last_modified?: Date;
}

export async function GetObject(Key: string): Promise<PageFile> {
  const client = Client();
  const response = await client.send(
    new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: Key
    })
  );

  if (response.Body) {
    return {
      body: response.Body,
      type: response.ContentType,
      size: response.ContentLength,
      encoding: response.ContentEncoding,
      Key,
      filename: basename(Key),
      last_modified: response.LastModified
    }
  }

  throw new Error(`${Key}: not found`);
}

export async function ListObjects(prefix?: string) {
  const client = Client();
  const response = await client.send(
    new ListObjectsCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: prefix || '',
      MaxKeys: 1000
    })
  );

  return response;
}

export async function DeleteFile(filename: string) {
  const client = Client();
  const response = await client.send(
    new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename
    })
  );

  return response;
}

export async function UploadFile(filename: string, data: any, contentType?: any, contentEncoding?: any, expires?: Date, tags?: string) {
  const client = Client();
  const response = await client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename,
      Body: data,
      ContentType: contentType,
      ContentEncoding: contentEncoding,
      Expires: expires || undefined,
      Tagging: tags || undefined
    })
  );

  if (response.$metadata.httpStatusCode !== 200) {
    throw new Error('Error saving file');
  }

  return response;
}

export async function GetJson(Key: string): Promise<object> {
  const s3Client = Client();
  
  const s3Response = await s3Client.send(
    new GetObjectCommand({
      Key,
      Bucket: process.env.S3_BUCKET_NAME
    })
  )
  
  if (s3Response?.$metadata?.httpStatusCode !== 200) {
    throw new Error('Json not found')
  }

  const Body = await s3Response.Body?.transformToString();

  return JSON.parse(String(Body || '{}'));
}

export async function SaveJson(data: any, filename: `${string}.json`, expires?: Date, tags?: string): Promise<{ filename: string, json: object, response: ServiceOutputTypes }> {
  const response = await UploadFile(
    filename,
    JSON.stringify(data),
    'application/json',
    'utf-8', 
    expires,
    tags
  );

  if (response.$metadata.httpStatusCode !== 200) {
    throw new Error('Error saving json');
  }

  const json = await GetJson(filename);

  return { response, filename, json }
}

export async function DownloadUploadFile(url: string, filename: string, Key: string) {
  const res = await fetch(url);
  if (res.ok) {
    const buff = await res.arrayBuffer();
    if (buff) {
      await UploadFile(
        `${Key}/${filename}`,
        buff
      );
  
      return filename;
    }
  }

  throw new Error('Error fetching file');
}