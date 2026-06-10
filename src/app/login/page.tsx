"use client";

import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import styles from "./page.module.css";


export default function LoginPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);
  const [user, setUser] = React.useState({
    identifier: "",
    password: "",
  })
  const buttonDisabled = !(user.identifier.length > 0 && user.password.length > 0);
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <main className={styles["login-page"]}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.text}>Login</h1>
            <div className={styles.underline} />
          </div>

          <div className={styles.inputs} aria-busy="true">
            <div className={styles.label}>Loading login form...</div>
          </div>
        </div>
      </main>
    );
  }

  const toastAlertOptions = {
    position: "top-center" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light" as const,
    transition: Bounce,
  };

  const onLogin = async () => {
    try {

      setLoading(true);
      const response = await axios.post("/api/users/login", {
        email: user.identifier.trim().toLowerCase(),
        password: user.password,
      });
      console.log("Login sucess", response.data);
      toast.success("Login success");
      router.replace("/courses");
      router.refresh();

    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : "Login failed";

      const lowered = message.toLowerCase();

      if (lowered.includes("no account") || lowered.includes("was found with that")) {
        toast.warn("No account found, Sign up first", toastAlertOptions);
        return;
      }

      if (lowered.includes("incorrect") && lowered.includes("password")) {
        toast.error("Incorrect password", toastAlertOptions);
        return;
      }

      console.log("Login failed", message);
      toast.error(message, toastAlertOptions)

    } finally {
      setLoading(false)
    }
  }



  return (
    <main className={styles["login-page"]}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.text}>{loading ? "processing" : "Login"}</h1>
          <div className={styles.underline} />
        </div>

        <form
          suppressHydrationWarning
          className={styles.inputs}
          onSubmit={(e) => {
            e.preventDefault();
            if (!buttonDisabled) {
              onLogin();
            }
          }}
        >
          <label className={styles.label} htmlFor="email">email or username</label>
          <div className={styles.input}>
            <input
              id="email"
              type="text"
              autoComplete="username"
              value={user.identifier}
              onChange={(e) => setUser({...user, identifier: e.target.value})}
              placeholder="email or username"
            />
          </div>

          <label className={styles.label} htmlFor="password">password</label>
          <div className={styles.input}>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              placeholder="password"
            />
          </div>

          <div className={styles["forgot-password"]}>
            <Link href="/forgotpassword">Forgot password?</Link>
          </div>

          <div className={styles["submit-container"]}>
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className={`${styles.submit} ${buttonDisabled || loading ? styles.gray : ""}`.trim()}
            >
              Login here
            </button>
          </div>
        </form>

        <p className={styles["login-disclaimer"]}>
          Need an account? <Link className={styles.link} href="/signup">Visit Signup page</Link>
        </p>
      </div>
    </main>
  )
}