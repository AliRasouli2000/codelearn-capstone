"use client";

import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import styles from "./page.module.css";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [isTokenResolved, setIsTokenResolved] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const urlToken = searchParams.get("token") || "";
        setToken(urlToken);
        setIsTokenResolved(true);
    }, []);

    useEffect(() => {
        if (isTokenResolved && token.length > 0) {
            verifyUserEmail();
        }
    }, [isTokenResolved, token]);

    return (
        <main className={styles["verify-page"]}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.text}>Verify Email</h1>
                    <div className={styles.underline} />
                </div>

                <div className={styles.token}>
                    {!isTokenResolved
                        ? "Checking your verification link..."
                        : token
                        ? "We are verifying your email address now."
                        : "This verification link is missing required information."}
                </div>

                {verified && (
                    <div className={styles["status-success"]}>
                        Email Verified
                        <div>
                            <Link href="/login" className={styles.link}>Login</Link>
                        </div>
                    </div>
                )}

                {error && (
                    <div className={styles["status-error"]}>
                        Verification failed.
                    </div>
                )}
            </div>
        </main>
    )

}