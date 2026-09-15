import { Learning } from '../types';

const learning: Learning = {
  slug: 's3-cloudfront-images',
  title: 'Your S3 bucket is not a CDN: fixing slow images with CloudFront',
  summary:
    'Putting CloudFront in front of S3 gets you maybe a third of the win. The rest is Cache-Control on the objects, images sized to their slot, and a cache key that knows about your query strings.',
  published: '2026-09-15',
  tags: ['aws', 's3', 'cloudfront', 'performance'],
  body: [
    {
      kind: 'text',
      content:
        'If your `<img>` tags point at `https://my-bucket.s3.ap-southeast-1.amazonaws.com/...`, every image on your site is a round trip to one building in Singapore. A user in São Paulo pays for that. A user in Frankfurt pays for it too. Nothing caches in between, so they pay again on the next page.',
    },
    {
      kind: 'text',
      content:
        'CloudFront fixes it. But "put CloudFront in front of S3" is where most guides stop, and that step alone gets you maybe a third of the win.',
    },
    {
      kind: 'heading',
      content: '1. Lock the bucket, use OAC',
    },
    {
      kind: 'text',
      content:
        "A public image bucket is a billing problem before it's a security problem. Anyone who finds the URL can hammer it, S3 egress is priced per GB, and there's no cache in the way.",
    },
    {
      kind: 'text',
      content:
        "Use Origin Access Control, not the legacy Origin Access Identity. OAC works with buckets in every region, supports SSE-KMS, and handles PUT and DELETE. OAI doesn't.",
    },
    {
      kind: 'text',
      content:
        "The `AWS:SourceArn` condition is the part people leave out. Without it you've granted CloudFront in general access to your bucket, rather than your distribution:",
    },
    {
      kind: 'code',
      label: 'bucket-policy.json',
      content: `{
  "Effect": "Allow",
  "Principal": { "Service": "cloudfront.amazonaws.com" },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::my-image-bucket/*",
  "Condition": {
    "StringEquals": {
      "AWS:SourceArn": "arn:aws:cloudfront::111122223333:distribution/E1EXAMPLE"
    }
  }
}`,
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        'Two traps. Use the REST endpoint (`my-bucket.s3.region.amazonaws.com`), not the website endpoint, because OAC doesn\'t apply to the latter. And Object Ownership has to be "Bucket owner enforced." That\'s the default on new buckets but not on old ones, and the error you get is unhelpful.',
    },
    {
      kind: 'heading',
      content: '2. Set Cache-Control on the objects',
    },
    {
      kind: 'text',
      content: 'This is the step that makes the CDN actually work, and it lives in S3, not CloudFront.',
    },
    {
      kind: 'text',
      content:
        'Attach the managed CachingOptimized policy (`658327ea-f89d-4fab-a63d-7e88639e58f6`). Its default TTL is 24 hours, and that default kicks in whenever the origin sends no `Cache-Control` header, which is exactly what S3 does. So your images fall out of every edge cache once a day for no reason.',
    },
    {
      kind: 'text',
      content: 'Fix it at upload:',
    },
    {
      kind: 'code',
      label: 'upload.ts',
      content: `await s3.send(new PutObjectCommand({
  Bucket: "my-image-bucket",
  Key: \`img/\${contentHash}.jpg\`,
  Body: buffer,
  ContentType: "image/jpeg",
  CacheControl: "public, max-age=31536000, immutable",
}));`,
    },
    {
      kind: 'text',
      content:
        '`immutable` is only honest if the filename changes when the bytes change, so hash the key. Do that and you never invalidate anything again. A new image is just a new URL.',
    },
    {
      kind: 'heading',
      content: '3. Send an image the size of the box it goes in',
    },
    {
      kind: 'text',
      content:
        "Everything above makes a 2.4 MB photo arrive faster. It's still a 2.4 MB photo, and the slot it lands in is 380px wide on a phone.",
    },
    {
      kind: 'code',
      label: 'hero.html',
      content: `<img
  src="/img/a3f9c1.jpg"
  srcset="/img/a3f9c1-400.jpg 400w,
          /img/a3f9c1-800.jpg 800w,
          /img/a3f9c1-1600.jpg 1600w"
  sizes="(max-width: 640px) 100vw, 50vw"
  width="1600" height="900"
  alt="..."
  fetchpriority="high"
/>`,
    },
    {
      kind: 'text',
      content:
        '`width` and `height` aren\'t styling. They reserve the space before the image lands, which kills most of your CLS. `sizes` is the one everyone botches: `srcset` says what exists, `sizes` says how big the slot is, and getting it wrong makes the browser confidently pick the 1600w file for a thumbnail. Put `fetchpriority="high"` on the hero only.',
    },
    {
      kind: 'text',
      content:
        'And never lazy-load your LCP image. I\'ve seen that ship more than once. Someone adds `loading="lazy"` to a shared image component and the largest paint on the page gets deprioritized by the browser.',
    },
    {
      kind: 'heading',
      content: '4. WebP and AVIF',
    },
    {
      kind: 'text',
      content:
        'Convert on upload, not at the edge. Write `.webp` and `.avif` next to the original, serve them with `<picture>`, done. Every variant is its own URL and the cache key stays simple.',
    },
    {
      kind: 'text',
      content:
        'Edge negotiation on the `Accept` header works too, but browsers send long, varied Accept strings. Put the raw header in your cache key and you shatter one image into hundreds of variants. If you go that route, normalize it down to two or three values in a CloudFront Function first.',
    },
    {
      kind: 'heading',
      content: 'The bug that catches everyone',
    },
    {
      kind: 'text',
      content: 'You add resizing, request `?w=400` and `?w=800`, and every width comes back identical.',
    },
    {
      kind: 'text',
      content:
        "CachingOptimized doesn't include query strings in the cache key. CloudFront sees one object, caches whichever width arrived first, and serves it to everybody forever.",
    },
    {
      kind: 'text',
      content:
        'You need a custom cache policy that lists exactly the params you use (`w`, `q`, `format`) and nothing else. Not "all query strings," or the first campaign link with `?utm_source=` on an image URL gives you a cache miss per visitor.',
    },
    {
      kind: 'heading',
      content: 'Verify',
    },
    {
      kind: 'code',
      label: 'terminal',
      content: 'curl -sI https://cdn.example.com/img/a3f9c1.jpg | grep -i x-cache',
    },
    {
      kind: 'text',
      content:
        'First request is a Miss, second should be a Hit. If the second is still a Miss, something varying is in your cache key. Then check Cache statistics in the console for the real ratio across all edges, since curl only ever talks to one of them.',
    },
    {
      kind: 'heading',
      content: 'If you only have an hour',
    },
    {
      kind: 'text',
      content:
        "Steps 1 and 2. Private bucket, OAC, CachingOptimized, `max-age=31536000, immutable` on hashed filenames. That's most of the latency and all of the billing exposure. Do step 3 next. Everything after that is optimization you should earn your way into.",
    },
  ],
};

export default learning;
