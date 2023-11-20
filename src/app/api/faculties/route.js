import { connect } from "@/db/dbConfig"
import { faculties } from "@/models/faculties";
import { NextRequest, NextResponse } from "next/server"
connect()

export async function GET(request) {
    try {     
        const facultyData = await faculties.find();
        // console.log(facultyData);
        if(facultyData){
            return NextResponse.json({
                status: true,
                facultyData,
                message: "Data fetched successfully.",
            }, {status: 201})
        } else {
            return NextResponse.json({
                status: false,
                facultyData,
                message: "Something Went wrong.",
            }, {status: 400})
        }
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}