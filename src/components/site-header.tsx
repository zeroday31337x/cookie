"use client";

import Link from "next/link";
import { Cookie, Menu, Wallet } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/components/wallet-provider";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { address, connecting, error, connect, disconnect } = useWallet();

  return (
    <>
      <div className="chain-bar"><span className="pulse" /> Cookie Chain <span>·</span> live network</div>
      <header className="site-header">
        <Link className="brand" href="/"><Cookie size={22} /> <span>CookieQuest</span></Link>
        <nav className={open ? "nav open" : "nav"}>
          <Link href="/quests" onClick={() => setOpen(false)}>Quests</Link>
          <Link href="/leaderboard" onClick={() => setOpen(false)}>Leaderboard</Link>
          <Link href="/how-it-works" onClick={() => setOpen(false)}>How it works</Link>
          <Link href="/create" onClick={() => setOpen(false)}>Create</Link>
        </nav>
        <div className="header-actions">
          <button className="wallet-button" type="button" onClick={address ? disconnect : connect} disabled={connecting} title={error || undefined}>
            <Wallet size={17} /> {connecting ? "Connecting…" : address ? `${address.slice(0,4)}…${address.slice(-4)}` : "Connect"}
          </button>
          <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
            <Menu size={21} />
          </button>
        </div>
      </header>
    </>
  );
}
