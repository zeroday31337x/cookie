import { QuestCard } from "@/components/quest-card";
import { quests } from "@/lib/quests";

export default function QuestsPage() {
  return <main className="section page"><p className="eyebrow">Live hunts</p><h1>The quest board</h1><p className="lede narrow">Three seeded hunts designed to demonstrate fast, inexpensive Cookie Chain interactions.</p><div className="quest-grid top-gap">{quests.map((quest) => <QuestCard key={quest.id} quest={quest} />)}</div></main>;
}
