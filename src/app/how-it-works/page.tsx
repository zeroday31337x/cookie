import { Hash, KeyRound, Trophy, Wallet } from "lucide-react";

const steps = [
  [Wallet, "Connect", "Nightly connects directly to Cookie Chain. CookieQuest never handles seed phrases or private keys."],
  [Hash, "Commit", "The browser normalizes the answer and hashes cookiequest:v1 + quest + answer + salt using SHA-256."],
  [KeyRound, "Reveal", "After the delay, the program verifies the answer and commitment while preventing replay."],
  [Trophy, "Claim", "Eligible winners claim COOK from the quest vault and receive an on-chain achievement."],
] as const;

export default function HowItWorks() {
  return <main className="section page"><p className="eyebrow">Transparent by design</p><h1>Commit. Reveal. Claim.</h1><p className="lede narrow">A small protocol that makes a daily puzzle visibly native to Cookie Chain—not a web game with a wallet button attached.</p><div className="explain-list">{steps.map(([Icon, title, body], index) => <article key={title}><span>{index + 1}</span><Icon /><div><h2>{title}</h2><p>{body}</p></div></article>)}</div></main>;
}
