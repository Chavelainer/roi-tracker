"use client";

import { useState } from "react";
import styles from "./utm.module.css";

function buildUtmUrl(params: { baseUrl: string; utm_source: string; utm_medium: string; utm_campaign: string; utm_content?: string; utm_term?: string; }) {
  const url = new URL(params.baseUrl);
  url.searchParams.set("utm_source", params.utm_source);
  url.searchParams.set("utm_medium", params.utm_medium);
  url.searchParams.set("utm_campaign", params.utm_campaign);
  if (params.utm_content) url.searchParams.set("utm_content", params.utm_content);
  if (params.utm_term) url.searchParams.set("utm_term", params.utm_term);
  return url.toString();
}

export default function UTMBuilderPage() {
  const [baseUrl, setBaseUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [content, setContent] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("INSTAGRAM");

  async function onGenerate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const fullUrl = buildUtmUrl({ baseUrl, utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: content || undefined, utm_term: term || undefined });
      setResult(fullUrl);
    } catch (err) {
      alert("Invalid URL");
    }
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return alert("Please generate the URL first");
    setSaving(true);
    try {
      const res = await fetch("/api/utm/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl,
          utmSource: source,
          utmMedium: medium,
          utmCampaign: campaign,
          utmContent: content || null,
          utmTerm: term || null,
          fullUrl: result,
          channelName,
          channelType,
        }),
      });
      if (!res.ok) throw new Error("Failed to save UTM");
      alert("Saved successfully");
    } catch (err: any) {
      alert(err.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>UTM Builder</h1>
        <p className={styles.subtitle}>Create and track UTM parameters for your campaigns</p>
      </div>

      <div className={styles.card}>
        <form onSubmit={onGenerate} className={styles.form}>
          <input className={styles.input} required placeholder="Base URL (https://...)" value={baseUrl} onChange={e => setBaseUrl(e.target.value)} />
          <div className={styles.formGrid}>
            <input className={styles.input} required placeholder="utm_source" value={source} onChange={e => setSource(e.target.value)} />
            <input className={styles.input} required placeholder="utm_medium" value={medium} onChange={e => setMedium(e.target.value)} />
          </div>
          <input className={styles.input} required placeholder="utm_campaign" value={campaign} onChange={e => setCampaign(e.target.value)} />
          <div className={styles.formGrid}>
            <input className={styles.input} placeholder="utm_content (optional)" value={content} onChange={e => setContent(e.target.value)} />
            <input className={styles.input} placeholder="utm_term (optional)" value={term} onChange={e => setTerm(e.target.value)} />
          </div>
          <button className={styles.button} type="submit">✨ Generate URL</button>
        </form>

        {result && (
          <div className={styles.resultContainer}>
            <div className={styles.resultLabel}>Generated URL:</div>
            <code className={styles.resultCode}>{result}</code>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Save to Database</h2>
        <form onSubmit={onSave} className={styles.form}>
          <input className={styles.input} required placeholder="Channel Name (e.g., Instagram Ads)" value={channelName} onChange={e => setChannelName(e.target.value)} />
          <select className={styles.select} value={channelType} onChange={e => setChannelType(e.target.value)} aria-label="Channel Type">
            {[
              "INSTAGRAM","YOUTUBE","TIKTOK","X","EMAIL","DISCORD","BLOG","OTHER",
            ].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button className={styles.button} type="submit" disabled={saving || !result}>{saving ? "💾 Saving..." : "💾 Save to Database"}</button>
        </form>
      </div>
    </main>
  );
}


