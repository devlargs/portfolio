import { Learning } from '../types';

const learning: Learning = {
  slug: 'twitter-oauth-2',
  title: 'Twitter (X) OAuth 2.0 in a React app',
  summary:
    'Signing users in with X from a React app: the authorization code flow with PKCE, which credentials you actually need, and why the code exchange belongs on your server. Revised from a 2023 note.',
  published: '2023-07-25',
  updated: '2026-09-15',
  tags: ['oauth', 'twitter', 'react', 'auth'],
  body: [
    {
      kind: 'text',
      content:
        "To use Twitter OAuth 2.0 in a React application, you'll need to go through the following steps. The process changes over time, so always check the official X API documentation for the latest details.",
    },
    {
      kind: 'note',
      content:
        'I wrote the first version of this in July 2023, the same month Twitter became X. Much of it has since gone stale, and some of it was never right: it confused app-only bearer tokens with user sign in, and it recommended Create React App, which React deprecated in February 2025. This version is corrected against the current [X API docs](https://docs.x.com).',
    },
    {
      kind: 'heading',
      content: '1. Create an X developer account',
    },
    {
      kind: 'list',
      items: [
        "If you don't have one already, sign in at [console.x.com](https://console.x.com) with your X account and complete your developer profile. The old application form on developer.twitter.com no longer applies.",
        'Create a new app in the console.',
      ],
    },
    {
      kind: 'heading',
      content: '2. Get API credentials',
    },
    {
      kind: 'list',
      items: [
        "Set up user authentication for your app. Choose **Web App** if a server will hold the secret, which is what this guide does. Single page and native apps are public clients and don't get a secret.",
        'Add your callback URL. The `redirect_uri` you send later has to match one of the callback URLs in your app settings.',
        'Collect the **Client ID** and **Client Secret**. These are the OAuth 2.0 credentials for signing users in.',
        'The **API key** and **API secret** are different credentials. They are for OAuth 1.0a and app-only access, not for OAuth 2.0 user sign in.',
      ],
    },
    {
      kind: 'heading',
      content: '3. Set up your React application',
    },
    {
      kind: 'text',
      content:
        "Set up a new React application if you haven't done so already. Create React App is deprecated, so start from a framework such as Next.js or React Router, or a build tool such as Vite.",
    },
    {
      kind: 'heading',
      content: '4. Install dependencies',
    },
    {
      kind: 'text',
      content:
        'You no longer need `axios` or `query-string` for this. `fetch`, `URLSearchParams` and the Web Crypto API are built into modern browsers and Node, and they cover everything below.',
    },
    {
      kind: 'heading',
      content: '5. The OAuth 2.0 authentication flow',
    },
    {
      kind: 'text',
      content:
        'X uses the OAuth 2.0 Authorization Code Flow with PKCE to let users sign in and grant your app access to their account. It works in four steps:',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        "Your app sends the user to X's authorize page with a PKCE code challenge.",
        'The user approves, and X redirects them back to your callback URL with a short-lived authorization **code**, not an access token.',
        'Your server exchanges that code, plus the PKCE code verifier, for an access token. The code has to be exchanged within 30 seconds.',
        'Your server calls the X API with the access token.',
      ],
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        'The original version of this note said to request a Bearer Token from `https://api.twitter.com/oauth2/token` with your API key and secret, and use it on behalf of the user. That is app-only authentication. It has no user context, so it can read public data but can never act for a user. Sign in needs the flow below.',
    },
    {
      kind: 'heading',
      content: '6. Send the user to X',
    },
    {
      kind: 'text',
      content:
        'Generate a random `state` and a PKCE code verifier, keep both for the callback, and redirect the user to the authorize URL. A full-page redirect is the simplest option. A `window.open` popup also works, but popup blockers can get in the way.',
    },
    {
      kind: 'code',
      label: 'signInWithX.ts',
      content: `const X_CLIENT_ID = 'your-client-id';
const REDIRECT_URI = 'http://localhost:5173/callback';

const base64url = (bytes: Uint8Array): string =>
  btoa(String.fromCharCode(...bytes)).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');

export async function signInWithX() {
  const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  const challenge = base64url(new Uint8Array(digest));
  const state = crypto.randomUUID();

  sessionStorage.setItem('x_oauth', JSON.stringify({ verifier, state }));

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: X_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'tweet.read users.read offline.access',
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  window.location.assign(\`https://x.com/i/oauth2/authorize?\${params}\`);
}`,
    },
    {
      kind: 'text',
      content:
        'The Client ID is not a secret, so it is fine in the browser. The Client Secret is, and it never goes there.',
    },
    {
      kind: 'heading',
      content: '7. Exchange the code on your server',
    },
    {
      kind: 'text',
      content:
        'When X redirects back, check that the `state` in the URL matches the one you stored, then send the `code` and the verifier to your own backend. The exchange happens there, because a Web App authenticates with its Client Secret over Basic auth.',
    },
    {
      kind: 'code',
      label: 'server/exchangeCode.ts',
      content: `export async function exchangeCode(code: string, verifier: string) {
  const basic = Buffer.from(\`\${process.env.X_CLIENT_ID}:\${process.env.X_CLIENT_SECRET}\`).toString('base64');

  const res = await fetch('https://api.x.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: \`Basic \${basic}\`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:5173/callback',
      code_verifier: verifier,
    }),
  });

  if (!res.ok) throw new Error(\`Token exchange failed: \${res.status}\`);

  return res.json();
}`,
    },
    {
      kind: 'text',
      content:
        'The response includes an `access_token` and, because the scope asked for `offline.access`, a `refresh_token`. Access tokens last two hours. Without `offline.access` there is no refresh token, and the user has to sign in again.',
    },
    {
      kind: 'heading',
      content: '8. Make API requests with the access token',
    },
    {
      kind: 'text',
      content:
        'Once you have the access token, you can make authenticated requests to the X API on behalf of the user who signed in:',
    },
    {
      kind: 'code',
      label: 'server/getMe.ts',
      content: `const res = await fetch('https://api.x.com/2/users/me', {
  headers: { Authorization: \`Bearer \${accessToken}\` },
});`,
    },
    {
      kind: 'text',
      content:
        "Which endpoints you can call depends on the scopes the user granted and on your app's X API access, so check both in the console before you build on an endpoint.",
    },
    {
      kind: 'heading',
      content: '9. Storing tokens',
    },
    {
      kind: 'text',
      content:
        'Store the access token and the refresh token securely on your backend server, not in `localStorage`, so you can make future requests on behalf of the user. When the access token expires, post the refresh token to the same token endpoint with `grant_type=refresh_token` and the same Basic header to get a new one.',
    },
    {
      kind: 'heading',
      content: '10. Revoking access (optional)',
    },
    {
      kind: 'text',
      content:
        'If you offer a way for users to disconnect their X account from your app, revoke the token by posting it to `https://api.x.com/2/oauth2/revoke` with the same Basic header.',
    },
    {
      kind: 'heading',
      content: '11. Handle errors',
    },
    {
      kind: 'text',
      content:
        'Make sure you handle errors gracefully: a code that expired before the exchange, a `state` that does not match, expired access tokens, rate limits and network errors.',
    },
    {
      kind: 'text',
      content:
        'Keep in mind that OAuth 2.0 can be complex and involves a lot of edge cases, so check the [X API documentation](https://docs.x.com) for the latest guidelines. Keep the Client Secret and the tokens on a backend server, never in the React app.',
    },
  ],
};

export default learning;
