import mongoose from "mongoose";

const paperPublications = new mongoose.Schema({
    nameOfFaculty: {
        type: String,
        required: [true, "Please Provide Name of Faculty."],
    },
    authEmail: {
        type: String,
        required: [true, "Please Enter the author Email."],
    },
    department: {
        type: String,
        required: [true, "Please Enter the department."],
    },
    phoneNo: {
        type: Number,
        required: [true, "Please Enter the phoneNo."],
    },


    title: {
        type: String,
        required: [true, "Please Enter the title."],
    },
    subTitle: {
        type: String,
        required: [true, "Please Enter the subTitle."],
    },
    keywords: {
        type: String,
        required: [true, "Please Enter the keywords."],
    },
    publicationDate: {
        type: String,
        required: [true, "Please Enter the publicationDate."],
    },
    sourceORJournalName: {
        type: String,
        required: [true, "Please Enter the sourceORJournalName."],
    },
    volume: {
        type: String,
        required: [true, "Please Enter the volume."],
    },
    issue: {
        type: String,
        required: [true, "Please Enter the issue."],
    },
    DOI: {
        type: String,
        required: [true, "Please Enter the DOI."],
    },
    URL: {
        type: String,
        required: [true, "Please Enter the URL."],
    },
    webTitle: {
        type: String,
        required: [true, "Please Enter the webTitle."],
    },
    ISBN: {
        type: String,
        required: [true, "Please Enter the ISBN."],
    },
    ISSN: {
        type: String,
        required: [true, "Please Enter the ISSN."],
    },
    publisher: {
        type: String,
        required: [true, "Please Enter the publisher."],
    },
    citation: {
        type: String,
        required: [true, "Please Enter the citation."],
    },


    


    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const paperpublications = mongoose.models['paperpublications'] || mongoose.model('paperpublications', paperPublications)