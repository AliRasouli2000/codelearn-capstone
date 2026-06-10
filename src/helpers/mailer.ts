import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        // generate a random token
        const token = crypto.randomBytes(32).toString("hex");
        // hash the token for storage
        const hashedToken = await bcryptjs.hash(token, 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        const transportHost = process.env.TRANSPORT_HOST || "smtp.resend.com";
        const transportPort = Number(process.env.TRANSPORT_PORT || 587);
        const transportSecure = process.env.TRANSPORT_SECURE === "true";
        const transportUser = process.env.TRANSPORT_USER;
        const transportPass = process.env.TRANSPORT_PASS;
        const domain = process.env.DOMAIN;
        const fromEmail = process.env.MAIL_FROM || transportUser;

        const missingVars: string[] = [];
        if (!transportUser) missingVars.push("TRANSPORT_USER");
        if (!transportPass) missingVars.push("TRANSPORT_PASS");
        if (!domain) missingVars.push("DOMAIN");
        if (!fromEmail) missingVars.push("MAIL_FROM");

        if (missingVars.length > 0) {
            throw new Error(`Missing required email environment variables: ${missingVars.join(", ")}`);
        }

        const transport = nodemailer.createTransport({
            host: transportHost,
            port: transportPort,
            secure: transportSecure,
            auth: {
                user: transportUser,
                pass: transportPass
            }
        });

        const emailPath = emailType === "VERIFY" ? "verifyemail" : "resetpassword";

        const mailOptions = {
            from: fromEmail,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${domain}/${emailPath}?token=${token}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${domain}/${emailPath}?token=${token}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}
