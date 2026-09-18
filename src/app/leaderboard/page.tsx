import { ExternalLink } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type ActivityRow = {
  id: string;
  creator: string;
  title: string;
  signature: string;
  createdAt: Date | string;
};

export default async function ActivityPage() {
  let rows: ActivityRow[] = [];
  let unavailable = false;

  try {
    const result = await db().query<ActivityRow>(
      'select id, creator_wallet as creator, title, create_signature as signature, created_at as "createdAt" from quests where active order by created_at desc limit 25'
    );
    rows = result.rows;
  } catch {
    unavailable = true;
  }

  const explorer = process.env.NEXT_PUBLIC_COOKIE_CHAIN_EXPLORER_URL || "https://cookiescan.io";

  return (
    <main className="section page">
      <p className="eyebrow">Verified creator proofs</p>
      <h1>Activity</h1>
      <p className="lede narrow">Campaigns appear here only after CookieQuest verifies the confirmed Cookie Chain transaction, expected Memo payload, and creator signature.</p>
      {unavailable ? <p className="error-note">Activity indexing is temporarily unavailable. On-chain transactions remain verifiable in CookieScan.</p> : rows.length === 0 ? <p className="status-note">No creator campaigns have been indexed yet. Create one to populate this feed.</p> : <div className="leaderboard">{rows.map((row, index) => <div className="leader-row" key={row.id}><strong>#{index + 1}</strong><div><h3>{row.title}</h3><code>{row.creator}</code></div><span>{new Date(row.createdAt).toLocaleString("en-US", { timeZone: "UTC" })} UTC</span><a className="card-link" href={`${explorer}/tx/${encodeURIComponent(row.signature)}`} target="_blank" rel="noreferrer">Transaction <ExternalLink size={14}/></a></div>)}</div>}
    </main>
  );
}
