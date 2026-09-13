const leaders = [
  ["OvenWitch", "EBEq…A4Nd", 42, 8, 5], ["CrumbLord", "935q…UbQo", 31, 6, 3], ["NightBaker", "Db3B…PDAH", 27, 5, 4], ["SlotZero", "A7t5…kKNG", 18, 4, 1], ["MemoHunter", "EipG…mULm", 12, 3, 2],
];

export default function Leaderboard() {
  return <main className="section page"><p className="eyebrow">Proof of crumbs</p><h1>Leaderboard</h1><p className="lede narrow">This seeded presentation will be replaced by indexed Cookie Chain program accounts and events.</p><div className="leaderboard">{leaders.map(([name, wallet, crumbs, solved, streak], index) => <div className="leader-row" key={String(name)}><strong>#{index + 1}</strong><div><h3>{name}</h3><code>{wallet}</code></div><span><b>{crumbs}</b> crumbs</span><span>{solved} solved</span><span>{streak} day streak</span></div>)}</div></main>;
}
