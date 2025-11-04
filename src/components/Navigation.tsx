import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.logo}>
          <span className={styles.logoIcon}>📊</span>
          <span className={styles.logoText}>Whop ROI Tracker</span>
        </Link>
        <div className={styles.links}>
          <Link href="/dashboard" className={styles.link}>Dashboard</Link>
          <Link href="/campaigns" className={styles.link}>Campaigns</Link>
          <Link href="/utm" className={styles.link}>UTM Builder</Link>
          <Link href="/costs" className={styles.link}>Costs</Link>
        </div>
      </div>
    </nav>
  );
}

