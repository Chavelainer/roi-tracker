import { prisma } from "@/lib/prisma";
import styles from "./campaigns.module.css";

export const dynamic = 'force-dynamic';

export default async function CampaignsPage() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      utmLinks: true,
      costs: true,
      events: {
        where: { type: "PURCHASE" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Campaigns</h1>
        <p className={styles.subtitle}>Manage and track your marketing campaigns</p>
      </div>
      <div className={styles.card}>
        {campaigns.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No campaigns yet</h3>
            <p>Create your first campaign by saving a UTM link</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>UTM Links</th>
                <th className={styles.th}>Purchases</th>
                <th className={styles.th}>Costs</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {campaigns.map((c: typeof campaigns[0]) => (
                <tr key={c.id}>
                  <td className={styles.td}><strong>{c.name}</strong></td>
                  <td className={styles.td}>{c.utmLinks.length}</td>
                  <td className={styles.td}>{c.events.length}</td>
                  <td className={styles.td}>{c.costs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}


