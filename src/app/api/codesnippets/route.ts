import {NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import CodeSnippet from "@/models/codeSnippetModel";


connect();


export async function GET() {
    try {
        const codeSnippets = await CodeSnippet.find().select("title code");

        return NextResponse.json({codeSnippets}, {status: 200})
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({error: message}, {status: 500})
    }
}