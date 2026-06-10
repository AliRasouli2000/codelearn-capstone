import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token, newPassword} = reqBody;

        if (typeof token !== "string" || token.trim().length === 0) {
            return NextResponse.json({error: "Token is required"}, {status: 400});
        }

        if (typeof newPassword !== "string" || newPassword.trim().length < 8) {
            return NextResponse.json({error: "Password must be at least 8 characters long"}, {status: 400});
        }

        const normalizedPassword = newPassword.trim();

        // Find all users with unexpired reset tokens
        const users = await User.find({forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!users || users.length === 0) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }

        // Find the user with matching token
        let validUser = null;
        for (const user of users) {
            const isTokenValid = await bcryptjs.compare(token, user.forgotPasswordToken);
            if (isTokenValid) {
                validUser = user;
                break;
            }
        }

        if (!validUser) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(normalizedPassword, salt);

        validUser.password = hashedPassword;
        validUser.forgotPasswordToken = undefined;
        validUser.forgotPasswordTokenExpiry = undefined;
        await validUser.save();

        return NextResponse.json({
            message: "Password changed successfully",
            success:  true
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}