"use client";

import { useState } from "react";
import styles from "./costs.module.css";

export default function CostsPage() {
  const [campaignName, setCampaignName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("OTHER");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [incurredOn, setIncurredOn] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const amountCents = Math.round(parseFloat(amount) * 100);
      const res = await fetch("/api/costs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignName, channelName, channelType, amountCents, note: note || null, incurredOn: incurredOn || null }),
      });
      if (!res.ok) throw new Error("Failed to save cost");
      setCampaignName(""); setChannelName(""); setAmount(""); setNote(""); setIncurredOn("");
      alert("Saved");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add Campaign Cost</h1>
        <p className={styles.subtitle}>Track expenses for your marketing campaigns</p>
      </div>
      <div className={styles.card}>
        <form onSubmit={onSubmit} className={styles.form}>
          <input className={styles.input} required placeholder="Campaign Name" value={campaignName} onChange={e => setCampaignName(e.target.value)} />
          <input className={styles.input} required placeholder="Channel Name" value={channelName} onChange={e => setChannelName(e.target.value)} />
          <select className={styles.select} value={channelType} onChange={e => setChannelType(e.target.value)} aria-label="Channel Type">
            {["INSTAGRAM","YOUTUBE","TIKTOK","X","EMAIL","DISCORD","BLOG","OTHER"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input className={styles.input} required type="number" step="0.01" placeholder="Amount (e.g., 120.00)" value={amount} onChange={e => setAmount(e.target.value)} />
          <input className={styles.input} type="date" aria-label="Date Incurred" value={incurredOn} onChange={e => setIncurredOn(e.target.value)} />
          <input className={styles.input} placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} />
          <button className={styles.button} type="submit" disabled={saving}>{saving ? "💾 Saving..." : "💾 Save Cost"}</button>
        </form>

        <div className={styles.linkContainer}>
          <a href="/dashboard">← Back to Dashboard</a>
        </div>
      </div>
    </main>
  );
}


