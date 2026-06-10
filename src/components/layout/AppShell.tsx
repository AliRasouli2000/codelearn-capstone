"use client";

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import ProgressContext, {
  defaultUserData,
  type UserData,
} from "@/contexts/ProgressContext";
import styles from "./AppShell.module.css";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    const loadUserInfo = async () => {
      try {
        const { data } = await axios.get("/api/users/userinfo", {
          withCredentials: true,
        });

        const user = data.data;
        if (!isMounted || !user) {
          return;
        }

        setUserData((prev) => ({
          ...prev,
          username: user.username ?? "",
          email: user.email ?? "",
          htmlQuizScore: String(user.quizScores?.html ?? user.htmlQuizScore ?? ""),
          cssQuizScore: String(user.quizScores?.css ?? user.cssQuizScore ?? ""),
          JSQuizScore: String(user.quizScores?.js ?? user.JSQuizScore ?? ""),
          loggedIn: true,
        }));
      } catch {
        if (!isMounted) {
          return;
        }

        setUserData(defaultUserData);
      }
    };

    void loadUserInfo();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const router = useRouter();
  const { loggedIn, username } = userData;

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
    } finally {
      setUserData(defaultUserData);
      router.replace("/login");
      router.refresh();
    }
  };

  return (
    <ProgressContext.Provider value={{ userData, setUserData }}>
      <div className={styles.rootLayout}>
        <header className={styles.header}>
          <nav className={styles.navbar}>
            <div className={styles.logo}>CodeLearn</div>
            <div className={styles.navLinks}>
              {!loggedIn && (
                <Link href="/login" className={styles.navLink}>
                  Login / Sign Up
                </Link>
              )}

              {loggedIn && (
                <>
                  <Link href="/" className={styles.navLink}>
                    Home
                  </Link>
                  <Link href="/courses" className={styles.navLink}>
                    Courses
                  </Link>
                  <Link href="/flashcards" className={styles.navLink}>
                    Flash Cards
                  </Link>
                  <Link href="/minigames" className={styles.navLink}>
                    Mini Games
                  </Link>
                  <Link href="/progress" className={styles.navLink}>
                    Progress
                  </Link>
                  <Link href="/about" className={styles.navLink}>
                    About
                  </Link>
                  <p className={styles.welcomeText}>Hi, {username}</p>
                  <button
                    type="button"
                    className={styles.logoutButton}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </ProgressContext.Provider>
  );
}
