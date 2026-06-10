import Link from "next/link";
import styles from "../verifyemail/page.module.css";

export default function VerifyEmailSentPage() {
  return (
    <main className={styles["verify-page"]}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.text}>Check Your Email</h1>
          <div className={styles.underline} />
        </div>

        <div className={styles.token}>
          A verification email has been sent. Please check your inbox and spam folder, then click the link to verify your account.
        </div>

        <div className={styles["status-success"]}>
          Once you verify your email, you can log in.
          <div>
            <Link href="/login" className={styles.link}>Go to Login</Link>
          </div>
        </div>
      </div>
    </main>
  );
}