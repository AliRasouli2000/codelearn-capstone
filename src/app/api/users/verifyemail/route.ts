import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("Verify token received (length):", token?.length);

        // Find all users with unexpired tokens to check against
        const users = await User.find({verifyTokenExpiry: {$gt: Date.now()}});

        if (!users || users.length === 0) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }

        // Find the user with matching token
        let validUser = null;
        for (const user of users) {
            const isTokenValid = await bcryptjs.compare(token, user.verifyToken);
            if (isTokenValid) {
                validUser = user;
                break;
            }
        }
        
        if (!validUser) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        
        console.log("Token verified for user:", validUser.email);

        validUser.isVerified = true;
        validUser.verifyToken = undefined;
        validUser.verifyTokenExpiry = undefined;
        await validUser.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success:  true
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}