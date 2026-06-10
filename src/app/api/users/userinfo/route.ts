import { getDataFromToken } from "@/helpers/getDataFromToken";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect();


export async function GET (request:NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({
                message: "No active session",
                data: null,
            });
        }

        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        });
        
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({error: message}, {status: 400});
    }
}