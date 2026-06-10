import {NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import Game from "@/models/gameModel";


connect();


export async function GET() {
    try {
        const games = await Game.find().select("id title description");

        return NextResponse.json({games}, {status: 200})
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({error: message}, {status: 500})
    }
}