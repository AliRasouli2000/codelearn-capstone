import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect();


export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const identifier = String(reqBody.email || "").trim();
        const normalizedIdentifier = identifier.toLowerCase();
        const password = String(reqBody.password || "");
        const looksLikeEmail = normalizedIdentifier.includes("@");

        if (!identifier || !password) {
            return NextResponse.json({error: "Please enter your email or username and password."}, {status: 400});
        }

        // check if user exists
        let user = await User.findOne({ email: normalizedIdentifier });
        if (!user) {
            user = await User.findOne({ username: identifier });
        }
        if (!user) {
            // Legacy-safe fallback: tolerate extra spaces/casing in stored emails or usernames.
            const escapedEmail = normalizedIdentifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const escapedUsername = identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            user = await User.findOne({
                $or: [
                    { email: { $regex: `^\\s*${escapedEmail}\\s*$`, $options: "i" } },
                    { username: { $regex: `^\\s*${escapedUsername}\\s*$`, $options: "i" } },
                ],
            });
        }
        if (!user) {
            const message = looksLikeEmail
                ? "No account was found with that email address."
                : "No account was found with that username.";
            return NextResponse.json({error: message}, {status: 400})
        }

        if (!user.isVerified) {
            return NextResponse.json(
                { error: "Please verify your email before logging in." },
                { status: 403 }
            );
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error: "The password you entered is incorrect."}, {status: 400});
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        // create response, add token to response cookies, and send the response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        })
        return response;

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({error: message}, {status: 500})
    }
}