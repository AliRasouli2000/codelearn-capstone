"use client";

import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles["about-page"]}>
      <section className={styles["about-hero"]}>
        <div className={styles["about-hero-content"]}>
          <p className={styles["about-tagline"]}>About this project</p>
          <h1 className={styles["about-title"]}>Full-Stack Learning Hub</h1>
          <p className={styles["about-subtitle"]}>
            A capstone project built to teach HTML, CSS, and JavaScript through
            interactive lessons, flashcards, and mini games — while combining
            polished UI with real back-end services and data workflows.
          </p>
        </div>
      </section>

      <section className={styles["about-main"]}>
        <div className={styles["about-grid"]}>
          <div className={styles["about-card"]}>
            <h2>Why I Built This</h2>
            <p>
              This website started as a front-end capstone project. I wanted to
              grow it beyond a simple landing page into a complete learning
              platform that demonstrates UI design plus API integration,
              authentication flow, data persistence, and reusable architecture.
            </p>
          </div>

          <div className={styles["about-card"]}>
            <h2>What You&apos;ll Find</h2>
            <ul className={styles["about-list"]}>
              <li>Structured HTML, CSS, and JavaScript courses</li>
              <li>Interactive flashcards and mini games with saved progress</li>
              <li>Account-based features with login, reset, and verification</li>
              <li>Responsive front-end connected to real API endpoints</li>
            </ul>
          </div>

          <div className={styles["about-card"]}>
            <h2>Skills Showcased</h2>
            <ul className={styles["about-list"]}>
              <li>React components, routing, and state management</li>
              <li>Reusable, modular styling and responsive layout systems</li>
              <li>Next.js API routes, request handling, and error responses</li>
              <li>MongoDB models with authentication and token workflows</li>
            </ul>
          </div>

          <div className={styles["about-card"]}>
            <h2>My Goal</h2>
            <p>
              My goal is to make web development feel approachable and fun,
              while also showing that I can design, build, and ship a complete
              full-stack product from scratch — the kind of end-to-end work I
              aim to deliver in future software engineering roles.
            </p>
          </div>
        </div>
      </section>

      <section className={styles["about-footer-note"]}>
        <p>
          This project is constantly evolving. As I learn new techniques and
          tools, I&apos;ll keep improving the architecture, features, and learning
          experience across both client and server.
        </p>
      </section>

      <footer className={styles["page-footer"]}>
        <p>© 2026 CodeLearn. All rights reserved.</p>
      </footer>
    </main>
  );
}

