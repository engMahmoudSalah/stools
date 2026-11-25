# Stash

Smart bookmark manager with categories, search and a dead-link checker.

**Live:** https://stools.mahmodsalah.workers.dev

## Features

- Save, search and organise bookmarks by category
- Firebase authentication and Firestore storage (rules in firestore.rules)
- Dead-link checker: verifies each bookmark through a Cloudflare Workers endpoint, 5 at a time, and never flags a link when the checker itself is unreachable
- Modern React interface

## Tech stack

React, TypeScript, Vite, Tailwind CSS, Firebase

## Hosting

Cloudflare Workers (static assets) + Workers API for link checking. No paid services.

## Run locally

```bash
npm install
npm run dev
```

Build with `npm run build`, type-check with `npx tsc --noEmit`.

## Notes

The legacy Express server.ts and Prisma files are kept for local development only; the live site is fully static.

## Author

Mahmoud Salah, https://github.com/engMahmoudSalah
