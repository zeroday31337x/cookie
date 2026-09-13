import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hash, KeyRound, Trophy } from "lucide-react";
import { QuestCard } from "@/components/quest-card";
import { quests } from "@/lib/quests";

export default function Home() {
  return (
    <main>
      <section className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Cookie Chain scavenger hunt</p>
          <h1>Find the Crumb</h1>
          <p className="lede">Connect a wallet, commit a SHA-256 of your answer, reveal after finality, and claim COOK from a program vault. Three seeded quests. Live Cookie Chain slot in the header.</p>
          <div className="button-row">
            <Link className="primary-button" href="/quests/bakers-note">Start the demo quest <ArrowRight size={18} /></Link>
            <Link className="secondary-button" href="/how-it-works">How commit–reveal works</Link>
          </div>
          <p className="microcopy">Demo quest: The Baker&apos;s Note · 0.50 COOK · judges cannot get stuck</p>
        </div>
        <div className="hero-art"><Image src="/hero.jpg" alt="A dark chocolate cookie with a trail of crumbs" fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
      </section>

      <section className="section compact">
        <div className="section-heading"><div><p className="eyebrow">Today&apos;s tray</p><h2>Three crumbs. One chain.</h2></div><Link href="/quests">View all quests <ArrowRight size={16} /></Link></div>
        <div className="quest-grid">{quests.map((quest) => <QuestCard key={quest.id} quest={quest} />)}</div>
      </section>

      <section className="section compact mechanics">
        <p className="eyebrow">Built for verifiability</p><h2>Answers stay hidden until reveal.</h2>
        <div className="mechanic-grid">
          <div><Hash /><h3>Commit</h3><p>Hash the normalized answer with a private salt and submit only the digest.</p></div>
          <div><KeyRound /><h3>Reveal</h3><p>Reveal after the window opens. The program recomputes and verifies the commitment.</p></div>
          <div><Trophy /><h3>Claim</h3><p>First valid solvers claim COOK and permanent crumb achievements.</p></div>
        </div>
      </section>
    </main>
  );
}
