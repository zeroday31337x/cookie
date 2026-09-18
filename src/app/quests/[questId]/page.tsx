import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Hash, ShieldCheck } from "lucide-react";
import { getQuest, quests } from "@/lib/quests";
import { QuestFlow } from "@/components/quest-flow";

export function generateStaticParams() { return quests.map((quest) => ({ questId: quest.id })); }

export default async function QuestPage({ params }: { params: Promise<{ questId: string }> }) {
  const { questId } = await params;
  const quest = getQuest(questId);
  if (!quest) notFound();
  return (
    <main className="section page quest-detail">
      <Link className="back" href="/quests"><ArrowLeft size={16} /> Quest board</Link>
      <div className="detail-grid">
        <div><p className="eyebrow">{quest.category} · {quest.difficulty}</p><h1>{quest.title}</h1><p className="lede narrow">{quest.tagline}</p><div className="detail-art"><Image src={quest.image} alt="" fill priority sizes="(max-width: 800px) 100vw, 50vw" /></div></div>
        <section className="flow-card">
          <div className="steps"><span className="active"><Hash /> Commit</span><span><Clock /> Reveal</span><span><ShieldCheck /> Record</span></div>
          <p className="eyebrow">Clue</p><p className="clue">{quest.clue}</p>
          <QuestFlow quest={quest} />
        </section>
      </div>
    </main>
  );
}
