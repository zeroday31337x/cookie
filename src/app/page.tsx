import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hash, KeyRound, ShieldCheck } from "lucide-react";
import { QuestCard } from "@/components/quest-card";
import { quests } from "@/lib/quests";

export default function Home() {
  return (
    <main>
      <section className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Cookie Chain scavenger hunt</p>
          <h1>Find the Crumb</h1>
          <p className="lede">Connect Nightly, commit a salted SHA-256 answer digest, reveal it in a second Cookie Chain transaction, and record an on-chain solve proof. Three seeded quests make the full transaction flow easy to judge.</p>
          <div className="button-row">
            <Link className="primary-button" href="/quests/bakers-note">Start the demo quest <ArrowRight size={18} /></Link>
            <Link className="secondary-button" href="/how-it-works">How commit–reveal works</Link>
          </div>
          <p className="microcopy">Demo quest: The Baker&apos;s Note · three wallet-signed Cookie Chain transactions · CookieScan proof links</p>
        </div>
        <div className="hero-art"><Image src="/hero.jpg" alt="A dark chocolate cookie with a trail of crumbs" fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
      </section>

      <section className="section compact">
        <div className="section-heading"><div><p className="eyebrow">Today&apos;s tray</p><h2>Three crumbs. One chain.</h2></div><Link href="/quests">View all quests <ArrowRight size={16} /></Link></div>
        <div className="quest-grid">{quests.map((quest) => <QuestCard key={quest.id} quest={quest} />)}</div>
      </section>

      <section className="section compact mechanics">
        <p className="eyebrow">Built for verifiability</p><h2>Every step leaves a Cookie Chain receipt.</h2>
        <div className="mechanic-grid">
          <div><Hash /><h3>Commit</h3><p>Hash the normalized answer with a private salt and submit only the digest.</p></div>
          <div><KeyRound /><h3>Reveal</h3><p>Reveal the normalized answer and salt in a second confirmed transaction.</p></div>
          <div><ShieldCheck /><h3>Record</h3><p>Write a final solve proof and open every confirmed transaction directly in CookieScan.</p></div>
        </div>
      </section>
    </main>
  );
}
