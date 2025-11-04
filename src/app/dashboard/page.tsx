import { prisma } from "@/lib/prisma";
import styles from "./dashboard.module.css";

export const dynamic = 'force-dynamic';

function formatCurrencyCents(valueCents: number | null | undefined): string {
  const value = (valueCents ?? 0) / 100;
  return value.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default async function DashboardPage() {
  const [revenueAgg, costAgg, purchaseCount] = await Promise.all([
    prisma.event.aggregate({
      where: { type: "PURCHASE" },
      _sum: { valueCents: true },
      _count: true,
    }),
    prisma.cost.aggregate({ _sum: { amountCents: true } }),
    prisma.event.count({ where: { type: "PURCHASE" } }),
  ]);

  const totalRevenueCents = revenueAgg._sum.valueCents ?? 0;
  const totalCostCents = costAgg._sum.amountCents ?? 0;
  const roi = totalCostCents > 0 ? (totalRevenueCents - totalCostCents) / totalCostCents : null;
  const cpaCents = purchaseCount > 0 ? Math.round(totalCostCents / purchaseCount) : null;
  const roas = totalCostCents > 0 ? totalRevenueCents / totalCostCents : null;

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Overview of your marketing performance</p>
      </div>
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
    </main>
  );
}