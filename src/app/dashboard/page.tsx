import { prisma } from "@/lib/prisma";
import styles from "./dashboard.module.css";

export const dynamic = 'force-dynamic';

function formatCurrencyCents(valueCents: number | null | undefined): string {
  const value = (valueCents ?? 0) / 100;
  return value.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default async function DashboardPage() {
  let revenueAgg, costAgg, purchaseCount;
  let totalRevenueCents = 0;
  let totalCostCents = 0;
  let roi = null;
  let cpaCents = null;
  let roas = null;
  let dbError = false;

  try {
    [revenueAgg, costAgg, purchaseCount] = await Promise.all([
      prisma.event.aggregate({
        where: { type: "PURCHASE" },
        _sum: { valueCents: true },
        _count: true,
      }),
      prisma.cost.aggregate({ _sum: { amountCents: true } }),
      prisma.event.count({ where: { type: "PURCHASE" } }),
    ]);

    totalRevenueCents = revenueAgg._sum.valueCents ?? 0;
    totalCostCents = costAgg._sum.amountCents ?? 0;
    roi = totalCostCents > 0 ? (totalRevenueCents - totalCostCents) / totalCostCents : null;
    cpaCents = purchaseCount > 0 ? Math.round(totalCostCents / purchaseCount) : null;
    roas = totalCostCents > 0 ? totalRevenueCents / totalCostCents : null;
  } catch (error) {
    console.error("Database error:", error);
    dbError = true;
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Overview of your marketing performance</p>
      </div>
      {dbError ? (
        <div className={styles.card} style={{ padding: "2rem", textAlign: "center" }}>
          <h3 style={{ color: "var(--error)", marginBottom: "1rem" }}>Database Connection Error</h3>
          <p style={{ marginBottom: "1rem" }}>Unable to connect to database. Please check your DATABASE_URL configuration.</p>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            See <code>URGENT_FIX.md</code> for setup instructions.
          </p>
        </div>
      ) : (
        <>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total Revenue</div>
          <div className={styles.metricValue}>{formatCurrencyCents(totalRevenueCents)}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total Cost</div>
          <div className={styles.metricValue}>{formatCurrencyCents(totalCostCents)}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>ROI</div>
          <div className={styles.metricValue}>{roi !== null ? `${(roi * 100).toFixed(1)}%` : "—"}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>CPA</div>
          <div className={styles.metricValue}>{cpaCents !== null ? formatCurrencyCents(cpaCents) : "—"}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>ROAS</div>
          <div className={styles.metricValue}>{roas !== null ? roas.toFixed(2) : "—"}</div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <ul className={styles.linksList}>
          <li><a href="/utm">🔗 UTM Builder</a></li>
          <li><a href="/campaigns">📊 Campaigns</a></li>
          <li><a href="/costs">💰 Add Costs</a></li>
        </ul>
      </div>
        </>
      )}
    </main>
  );
}