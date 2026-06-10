import {NextResponse} from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";


connect();


export async function GET() {
    try {
        const courses = await Course.find().select("courseId coursePageName title description");

        return NextResponse.json({courses}, {status: 200})
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({error: message}, {status: 500})
    }
}