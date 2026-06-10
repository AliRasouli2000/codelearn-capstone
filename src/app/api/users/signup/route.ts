import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const username = String(reqBody.username || "").trim();
        const email = String(reqBody.email || "").trim().toLowerCase();
        const password = String(reqBody.password || "");

        if (!username || !email || !password) {
            return NextResponse.json({error: "Username, email, and password are required"}, {status: 400});
        }

        if (username.length < 11) {
            return NextResponse.json({error: "Username must be at least 11 characters"}, {status: 400});
        }

        if (!email.includes("@")) {
            return NextResponse.json({error: "Email must include @"}, {status: 400});
        }

        if (password.length < 11) {
            return NextResponse.json({error: "Password must be at least 11 characters"}, {status: 400});
        }

        // check if user already exists
        const user = await User.findOne({email});

        if (user) {
            return NextResponse.json({error: "An account with this email already exists. Please log in instead."}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({error: message}, {status: 500})
    }
}
