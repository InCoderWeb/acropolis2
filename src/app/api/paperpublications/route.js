import { connect } from "@/db/dbConfig"
import { paperpublications } from "@/models/paperpublications";
import { NextRequest, NextResponse } from "next/server"
connect()

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            nameOfFaculty,
            authEmail,
            department,
            phoneNo,

            title,
            subTitle,
            keywords,
            publicationDate,
            sourceORJournalName,
            volume,
            issue,
            DOI,
            URL,
            webTitle,
            ISBN,
            ISSN,
            publisher,
        } = body

        console.log(nameOfFaculty,
            authEmail,
            department,
            phoneNo,

            title,
            subTitle,
            keywords,
            publicationDate,
            sourceORJournalName,
            volume,
            issue,
            DOI,
            URL,
            ISBN,
            ISSN,
            webTitle,
            publisher);
        if(nameOfFaculty != "" || authEmail != "" ||department != "" ||phoneNo != "" || title != "" || subTitle != "" || keywords != "" || publicationDate != "" || sourceORJournalName != "" || volume != "" || issue != "" || DOI != "" || URL != "" || ISBN != "" || ISSN != "" || publisher != "" || webTitle != ""){
            const checkData = await paperpublications.findOne({ISSN});
            if(checkData){
                return NextResponse.json({
                    status: false,
                    message: "ISSN No. already exist.",
                }, {status: 400})
            } else {

                const newPaperpublications = new paperpublications({
                    nameOfFaculty,
                    authEmail,
                    department,
                    phoneNo,

                    title,
                    subTitle,
                    keywords,
                    publicationDate,
                    sourceORJournalName,
                    volume,
                    issue,
                    DOI,
                    URL,
                    ISBN,
                    ISSN,
                    webTitle,
                    publisher
                })
                
                const savedData = await newPaperpublications.save()
                console.log(savedData);          
                
                return NextResponse.json({
                    status: true,
                    message: "Data added successfully.",
                }, {status: 201})
            }

        }else{
            return NextResponse.json({
                status: false,
                message: "All fields are required",
            }, {status: 400})
        }
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function GET() {
    try {     
        const paperPublicationsData = await paperpublications.find();
        // console.log(facultyData);
        if(paperPublicationsData){
            return NextResponse.json({
                status: true,
                paperPublicationsData,
                message: "Data fetched successfully.",
            }, {status: 201})
        } else {
            return NextResponse.json({
                status: false,
                paperPublicationsData,
                message: "Something Went wrong.",
            }, {status: 400})
        }
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}