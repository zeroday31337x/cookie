import { Hash, KeyRound, ShieldCheck, Wallet } from "lucide-react";

const steps = [
  [Wallet, "Connect", "Nightly connects to Cookie Chain. CookieQuest never receives seed phrases or private keys."],
  [Hash, "Commit", "The browser normalizes the answer, adds a random salt, hashes the payload with SHA-256, and writes only the digest in a confirmed Cookie Chain transaction."],
  [KeyRound, "Reveal", "A second wallet-signed transaction records the normalized answer and salt so the commitment can be independently recomputed from the public receipts."],
  [ShieldCheck, "Record", "A final transaction records the solve proof. CookieQuest links every confirmed transaction to CookieScan for inspection."],
] as const;

export default function HowItWorks() {
  return <main className="section page"><p className="eyebrow">Transparent by design</p><h1>Commit. Reveal. Record.</h1><p className="lede narrow">CookieQuest uses real Cookie Chain transactions as a lightweight proof log. The bounty build uses the deployed Memo program rather than claiming a custom reward vault or automatic token payout.</p><div className="explain-list">{steps.map(([Icon, title, body], index) => <article key={title}><span>{index + 1}</span><Icon /><div><h2>{title}</h2><p>{body}</p></div></article>)}</div></main>;
}
