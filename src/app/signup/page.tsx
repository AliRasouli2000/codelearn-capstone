"use client";

import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import styles from "./page.module.css";


export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: ""
  })
  const [loading, setLoading] = React.useState(false);
  const buttonDisabled = !(user.email.trim().length > 0 && user.password.length > 0 && user.username.trim().length > 0);

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

  const onSignup = async () => {
    try {
      const normalizedUsername = user.username.trim();
      const normalizedEmail = user.email.trim().toLowerCase();

      if (normalizedUsername.length < 11) {
        toast.error("Username must be at least 11 characters", toastAlertOptions);
        return;
      }

      if (!normalizedEmail.includes("@")) {
        toast.error("Email must include @", toastAlertOptions);
        return;
      }

      if (user.password.length < 11) {
        toast.error("Password must be at least 11 characters", toastAlertOptions);
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/users/signup", {
        ...user,
        username: normalizedUsername,
        email: normalizedEmail,
      });
      console.log("Signup success", response.data);
      toast.success("Signup successful");
      router.push("/verifyemail-sent")


    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : "Signup failed";

      if (message.toLowerCase().includes("already exists") || message.toLowerCase().includes("account with this email")) {
        toast.warn("Account exists. Please log in", toastAlertOptions);
        return;
      }

      console.log("Signup failed", message);
      toast.error(message, toastAlertOptions);

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles["signup-page"]}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.text}>{loading ? "Processing" : "Signup"}</h1>
          <div className={styles.underline} />
        </div>

        <form
          className={styles.inputs}
          onSubmit={(e) => {
            e.preventDefault();
            if (!buttonDisabled && !loading) {
              onSignup();
            }
          }}
        >
          <label className={styles.label} htmlFor="username">username</label>
          <div className={styles.input}>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
              placeholder="username"
            />
          </div>

          <label className={styles.label} htmlFor="email">email</label>
          <div className={styles.input}>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              placeholder="email"
            />
          </div>

          <label className={styles.label} htmlFor="password">password</label>
          <div className={styles.input}>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              placeholder="password"
            />
          </div>

          <div className={styles["submit-container"]}>
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className={`${styles.submit} ${buttonDisabled || loading ? styles.gray : ""}`.trim()}
            >
              {buttonDisabled ? "No signup" : "Signup"}
            </button>
          </div>
        </form>

        <p className={styles["signup-disclaimer"]}>
          Already have an account? <Link className={styles.link} href="/login">Visit login page</Link>
        </p>
      </div>
    </main>
  )
}