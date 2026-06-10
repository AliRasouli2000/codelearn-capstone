import {NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import Flashcard from "@/models/flashcardModel";


connect();


export async function GET() {
    try {
        const flashcards = await Flashcard.find().select("front back");

        return NextResponse.json({flashcards}, {status: 200})
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({error: message}, {status: 500})
    }
}