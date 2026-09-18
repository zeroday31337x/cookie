# CookieQuest — Find the Crumb

CookieQuest is an on-chain scavenger-hunt cApp built for Cookie Chain. Players connect Nightly, commit a salted SHA-256 answer digest, reveal the answer later, and record a solve proof. Creators can also publish new campaign proofs.

Every gameplay step is a real Cookie Chain transaction. The current bounty build uses Cookie Chain's deployed Memo program as a lightweight, verifiable event log; it does not claim to use a custom Anchor program or automatic reward vault.

## Live app

- App: https://cookie-zerodrivex.vercel.app
- Source: https://github.com/zeroday31337x/cookie
- Explorer: https://cookiescan.io
- Cookie Chain RPC: https://rpc.cookiescan.io
- Bridge: https://hyperlane.cookiescan.io

## What the app demonstrates

- Nightly wallet connection on Cookie Chain
- Connected wallet address display
- Real wallet-signed Cookie Chain transactions
- Confirmation handling at `confirmed` commitment
- Clear pending, success, cancellation, RPC, and expiry feedback
- CookieScan links for confirmed transactions
- Salted SHA-256 commit/reveal flow
- Creator campaign proofs written on chain
- Server-side verification that a creator signed the expected campaign transaction
- Postgres-backed indexing of verified creator campaigns
- Application activity view backed by indexed, verified campaign proofs

## On-chain flow

### Player flow

1. **Commit** — the browser normalizes the answer, generates a random salt, computes a SHA-256 digest, and writes only the digest to Cookie Chain.
2. **Reveal** — the wallet writes the normalized answer plus salt in a second transaction.
3. **Record solve** — the wallet writes a final solve-proof transaction.

The current implementation intentionally uses the Memo program for these proof events. The UI does not represent the final step as an automatic COOK payout.

### Creator flow

1. A creator connects Nightly.
2. The answer is hashed locally in the browser.
3. The creator signs a Cookie Chain campaign-proof transaction.
4. The server fetches the confirmed transaction from Cookie Chain and verifies:
   - the transaction succeeded,
   - the submitted creator wallet signed it,
   - the expected Memo payload is present.
5. Only then is the campaign indexed in Postgres.

## Cookie Chain configuration

- RPC: `https://rpc.cookiescan.io`
- Explorer: `https://cookiescan.io`
- Wallet: Nightly
- Program used for proof events: SPL Memo
- Memo program address: `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`

No custom CookieQuest program address is submitted for this version because the bounty build does not deploy a custom program.

## Local development

```bash
git clone https://github.com/zeroday31337x/cookie.git
cd cookie
npm install
cp .env.example .env.local
npm run dev
```

Environment variables:

```env
NEXT_PUBLIC_COOKIE_CHAIN_RPC_URL=https://rpc.cookiescan.io
NEXT_PUBLIC_COOKIE_CHAIN_EXPLORER_URL=https://cookiescan.io
DATABASE_URL=postgresql://...
```

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

For a full manual bounty-path test:

1. Install Nightly and configure/select Cookie Chain.
2. Open the live app.
3. Connect the wallet and confirm the address is displayed.
4. Open a seeded quest.
5. Commit an answer and approve the transaction.
6. Open the CookieScan transaction link.
7. Reveal and approve the second transaction.
8. Record the solve proof and verify the third transaction.
9. Open **Create**, publish a campaign proof, and confirm it appears in **Activity** after indexing.

A small COOK balance is required for network fees.

## Architecture

- Next.js App Router frontend and API routes
- Vercel deployment
- `@solana/web3.js` for Cookie Chain RPC interaction
- Solana Wallet Standard adapter for Nightly
- PostgreSQL for verified campaign indexing
- CookieScan for transaction inspection

## Security notes

- CookieQuest never receives or stores seed phrases or private keys.
- Wallet signing happens in Nightly.
- Campaign answers are hashed before submission.
- Creator campaign indexing is gated by server-side chain verification.
- Never place wallet seeds or deployer keys in browser or repository environment variables.

## License

MIT — see [LICENSE](./LICENSE).
