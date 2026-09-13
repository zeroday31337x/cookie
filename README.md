# CookieQuest — Find the Crumb

CookieQuest is a daily commit–reveal scavenger hunt designed for Cookie Chain. Players connect Nightly, solve a short quest, commit a SHA-256 answer digest, reveal after finality, and claim COOK rewards from an on-chain vault.

## Current status

This repository begins with the cleaned production frontend reconstructed from the original interactive prototype. The design, quest catalog, responsive pages, and judging flow are present. Real Nightly wallet signing, Cookie Chain transactions, the Anchor program, and chain-indexed leaderboard are the next implementation phase; disabled controls are intentional until those transactions are wired.

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Run validation with:

```bash
npm run typecheck
npm run lint
npm run build
```

## Architecture target

- Next.js App Router frontend deployed on Vercel
- Nightly wallet with Cookie Chain RPC configuration
- Anchor program for quest PDAs, answer commitments, reveals, claims, and badges
- COOK-denominated quest vault
- Neon Postgres for off-chain quest metadata and indexed read models only

Never place a wallet seed phrase or deployer key in the repository or browser environment.
