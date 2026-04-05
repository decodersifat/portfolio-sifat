# Portfolio (Next.js 16)

This is a Next.js portfolio project configured for Vercel deployment.

## Local Development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production Check (Before Deploy)

Run a production build locally:

```bash
npm run build
npm run start
```

## Deploy to Vercel

The repository is prepared for Vercel with:

- `vercel.json` (framework/build/install commands)
- `package.json` `engines.node` set to `>=20.9.0`
- `.env.example` for environment variable setup

Deployment steps:

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New Project** and import the repository.
3. Keep the detected framework as **Next.js**.
4. Add environment variables from `.env.example` in **Project Settings -> Environment Variables** (if you use them).
5. Click **Deploy**.

After deploy, each push to the connected branch will trigger automatic redeploys.

## Notes

- Remote image loading is already allowed for `https://dev.ittahad.site` in `next.config.ts`.
- Next.js 16 minimum Node version is 20.9.
