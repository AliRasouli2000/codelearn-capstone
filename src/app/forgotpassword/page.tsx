"use client";

import {useState} from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleForgotPassword = async () => {
        try {
            if (email.length > 0) {
                await axios.post("/api/users/forgotpassword", {email});
                setSuccess(true);
            }
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    return (
        <main className={styles["forgot-page"]}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.text}>Forgot Password</h1>
                    <div className={styles.underline} />
                </div>

                <form
                    className={styles.inputs}
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (email.length > 0) {
                            handleForgotPassword();
                        }
                    }}
                >
                    <label className={styles.label} htmlFor="email">email</label>
                    <div className={styles.input}>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles["submit-container"]}>
                        <button
                            type="submit"
                            disabled={email.length === 0}
                            className={`${styles.submit} ${email.length === 0 ? styles.gray : ""}`.trim()}
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>

                {success && (
                    <div className={styles["status-success"]}>
                        Reset link sent to your email!
                    </div>
                )}

                {error && (
                    <div className={styles["status-error"]}>
                        Error sending reset link. Please try again.
                    </div>
                )}
            </div>
        </main>
    )

}