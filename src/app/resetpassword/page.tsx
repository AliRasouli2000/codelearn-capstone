"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const resetUserPassword = async () => {
        try {
            const trimmedPassword = newPassword.trim();
            const trimmedConfirmPassword = confirmNewPassword.trim();

            if (!token) {
                setError("Invalid or missing reset token.");
                return;
            }

            if (trimmedPassword.length < 8) {
                setError("Password must be at least 8 characters long.");
                return;
            }

            if (trimmedPassword !== trimmedConfirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            await axios.post("/api/users/resetpassword", {
                token,
                newPassword: trimmedPassword,
            });

            setVerified(true);
            setError("");
        } catch (error: any) {
            setVerified(false);
            setError(error.response?.data?.error || "Something went wrong. Please try again.");
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <main className={styles["reset-page"]}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.text}>Reset Password</h1>
                    <div className={styles.underline} />
                </div>

                <form
                    className={styles.inputs}
                    onSubmit={(e) => {
                        e.preventDefault();
                        resetUserPassword();
                    }}
                >
                    <label className={styles.label} htmlFor="newPassword">new password</label>
                    <div className={styles.input}>
                        <input
                            id="newPassword"
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <label className={styles.label} htmlFor="confirmNewPassword">confirm new password</label>
                    <div className={styles.input}>
                        <input
                            id="confirmNewPassword"
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles["submit-container"]}>
                        <button
                            type="submit"
                            disabled={!token || newPassword.length === 0 || confirmNewPassword.length === 0}
                            className={`${styles.submit} ${!token || newPassword.length === 0 || confirmNewPassword.length === 0 ? styles.gray : ""}`.trim()}
                        >
                            Reset Password
                        </button>
                    </div>
                </form>

                {verified && (
                    <div className={styles["status-success"]}>
                        Password has been reset!
                        <div>
                            <Link href="/login" className={styles.link}>
                                Login
                            </Link>
                        </div>
                    </div>
                )}

                {error && (
                    <div className={styles["status-error"]}>
                        {error}
                    </div>
                )}
            </div>
        </main>
    );
}