"use client";

import Link from "next/link";
import { Cookie, Menu, Wallet } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="chain-bar"><span className="pulse" /> Cookie Chain <span>·</span> live network</div>
      <header className="site-header">
        <Link className="brand" href="/"><Cookie size={22} /> <span>CookieQuest</span></Link>
        <nav className={open ? "nav open" : "nav"}>
          <Link href="/quests" onClick={() => setOpen(false)}>Quests</Link>
          <Link href="/leaderboard" onClick={() => setOpen(false)}>Leaderboard</Link>
          <Link href="/how-it-works" onClick={() => setOpen(false)}>How it works</Link>
        </nav>
        <div className="header-actions">
          <button className="wallet-button" type="button" title="Nightly integration is the next implementation step">
            <Wallet size={17} /> Connect
          </button>
          <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
            <Menu size={21} />
          </button>
        </div>
      </header>
    </>
  );
}
