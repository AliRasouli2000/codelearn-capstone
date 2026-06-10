"use client";

import Link from "next/link";
import Courses from "@/components/home/Courses";
import Games from "@/components/home/Games";
import { CatFacts } from "@/components/home/CatFacts";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles["home-container"]}>
      {/* header */}
      <header className={styles.hero}>
        <h1>Welcome to CodeLearn</h1>
        <p>Learn HTML, CSS, and JavaScript interactively — and take short fun breaks with our mini games!</p>
        <Link href="/courses" className={styles["cta-btn"]}>Start Learning</Link>
      </header>

      <CatFacts />

      <Courses />

      <Games />

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 CodeLearn. All rights reserved.</p>
      </footer>
    </div>
  );
}

