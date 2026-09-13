import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Trophy } from "lucide-react";
import type { Quest } from "@/lib/quests";

export function QuestCard({ quest }: { quest: Quest }) {
  return (
    <article className="quest-card">
      <div className="quest-image">
        <Image src={quest.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
        <span className={`difficulty ${quest.difficulty.toLowerCase()}`}>{quest.difficulty}</span>
      </div>
      <div className="quest-body">
        <p className="eyebrow">{quest.category}</p>
        <h3>{quest.title}</h3>
        <p>{quest.tagline}</p>
        <div className="quest-meta">
          <span><Trophy size={15} /> {quest.rewardCook} COOK</span>
          <span>{quest.maxWinners - quest.winners} slots left</span>
        </div>
        <Link className="card-link" href={`/quests/${quest.id}`}>Open quest <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}
