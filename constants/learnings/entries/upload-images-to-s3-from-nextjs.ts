import { Learning } from '../types';

const learning: Learning = {
  slug: 'upload-images-to-s3-from-nextjs',
  title: 'Uploading images directly to S3 from Next.js',
  summary:
    'A Next.js route signs a short-lived upload URL and the browser sends the image straight to S3, so the file never passes through your server. Revised from a 2024 note for AWS SDK v3 and the App Router.',
  published: '2024-07-23',
  updated: '2026-09-15',
  tags: ['nextjs', 'aws', 's3', 'uploads'],
  body: [
    {
      kind: 'text',
      content:
        'The file never touches your server. A Next.js route signs a short-lived upload URL, and the browser sends the image straight to S3 with it.',
    },
    {
      kind: 'note',
      content:
        'I first wrote this in 2024 against `aws-sdk` v2 and the Pages Router. AWS ended support for v2 on September 8, 2025, so the code below uses the modular v3 packages and an App Router route handler instead.',
    },
    {
      kind: 'heading',
      content: 'Add this to your Next.js app',
    },
    {
      kind: 'text',
      content: 'Install the two v3 packages. The first talks to S3, and the second signs URLs:',
    },
    {
      kind: 'code',
      label: 'terminal',
      content: 'npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner',
    },
    {
      kind: 'text',
      content:
        'Then put the bucket details in `.env.local`. The names deliberately avoid the `AWS_` prefix, because Vercel can inject its own `AWS_` values into functions:',
    },
    {
      kind: 'code',
      label: '.env.local',
      content: `S3_REGION=us-east-1
S3_BUCKET_NAME=largs-photo-album
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=`,
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        'Never commit these, and never give them a `NEXT_PUBLIC_` prefix. Next.js inlines anything with that prefix into the browser bundle, which hands your secret key to every visitor.',
    },
    {
      kind: 'heading',
      content: 'Create a bucket on S3',
    },
    {
      kind: 'text',
      content:
        'If the images should be publicly viewable, untick **Block all public access** when you create it. New buckets block public access by default, and a public bucket policy will not save until that is off. Uploading through a presigned URL does not need public access at all; only reading the images back does.',
    },
    {
      kind: 'heading',
      content: 'Updating permissions',
    },
    {
      kind: 'list',
      items: [
        'Select the bucket that you created.',
        'Click the **Permissions** tab.',
        'Under **Bucket policy**, click **Edit**.',
        'The contents of the bucket policy are what we are going to generate with the [Policy Generator](https://awspolicygen.s3.amazonaws.com/policygen.html).',
        'Type of policy: S3 Bucket Policy',
        'Effect: Allow',
        'Principal: `*`',
        'Actions: `GetObject`',
        'Amazon Resource Name (ARN): `arn:aws:s3:::largs-photo-album/*`',
        'After that, click **Add Statement**, then **Generate Policy**.',
        'Clicking **Generate Policy** shows you a JSON object. Copy it and paste it in as the contents of the bucket policy.',
      ],
    },
    {
      kind: 'heading',
      content: 'Updating cross-origin resource sharing (CORS)',
    },
    {
      kind: 'text',
      content:
        'Still on the **Permissions** tab, scroll to **Cross-origin resource sharing (CORS)**, click **Edit**, and paste this:',
    },
    {
      kind: 'code',
      label: 'cors.json',
      content: `[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "HEAD", "GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]`,
    },
    {
      kind: 'text',
      content:
        '`"*"` is fine while you are testing. Once it works, narrow `AllowedOrigins` to your own origins, such as `http://localhost:3000` and your production domain.',
    },
    {
      kind: 'heading',
      content: 'Creating an IAM user',
    },
    {
      kind: 'list',
      items: [
        'Open **IAM**, which is a separate service from S3, and go to **Access management → Policies → Create policy**.',
        'First, select a service. Enter `S3`.',
        'Under **Actions**, select `PutObject`.',
        'Under **Resources**, select **Specific**.',
        'Add the ARN for your bucket by entering the bucket name, and tick **Any object name**.',
        'Name the policy and create it.',
        'Go to **Users → Create user**. On the permissions step, choose **Attach policies directly** and pick the policy you just made.',
        'Now you just have to get the access key for this user. Open the user, go to **Security credentials → Create access key**, choose the use case that fits (or **Other**), and copy both values into `.env.local`.',
      ],
    },
    {
      kind: 'heading',
      content: 'Create the upload route',
    },
    {
      kind: 'code',
      label: 'app/api/upload/route.ts',
      content: `import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function POST() {
  const imageName = crypto.randomUUID();

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: imageName,
  });

  const uploadURL = await getSignedUrl(s3, command, { expiresIn: 120 });

  return NextResponse.json({ uploadURL, imageName });
}`,
    },
    {
      kind: 'text',
      content:
        'Each call returns a URL that accepts one upload to that key for the next 120 seconds. v3 always signs with Signature Version 4, so the old `signatureVersion` option is gone.',
    },
    {
      kind: 'heading',
      content: 'Upload from the browser',
    },
    {
      kind: 'text',
      content: 'Ask the route for a URL, then send the file straight to it:',
    },
    {
      kind: 'code',
      label: 'upload.ts',
      content: `const { uploadURL, imageName } = await fetch('/api/upload', { method: 'POST' }).then((res) => res.json());

await fetch(uploadURL, {
  method: 'PUT',
  headers: { 'Content-Type': file.type },
  body: file,
});`,
    },
    {
      kind: 'text',
      content: 'Keep `imageName`. It is the key you use to find the image again.',
    },
    {
      kind: 'heading',
      content: 'Notable policies',
    },
    {
      kind: 'text',
      content:
        'If you want to prevent public access to your images and allow only your site to load them, use this policy in place of the public one above.',
    },
    {
      kind: 'code',
      label: 'bucket-policy.json',
      content: `{
  "Version": "2012-10-17",
  "Id": "http referer policy",
  "Statement": [
    {
      "Sid": "Allow get requests originating from nicelargs.vercel.app.",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::largs-photo-album/*",
      "Condition": {
        "StringLike": {
          "aws:Referer": "https://nicelargs.vercel.app/*"
        }
      }
    }
  ]
}`,
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        'Treat this as hotlink protection, not security. The `Referer` header is set by the client and easy to fake, and AWS advises against relying on `aws:Referer` to stop unauthorized access. For images that must stay private, keep the bucket private and hand out presigned `GET` URLs the same way as the upload, or [serve them through CloudFront](/learnings/s3-cloudfront-images).',
    },
  ],
};

export default learning;
