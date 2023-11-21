"use client";
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"  
import { LuDownload } from "react-icons/lu";

import { useFormik } from "formik"
import * as Y from "yup"
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '@/components/footer';
  
const initialValues = {
    nameOfFaculty: "",
    authEmail: "",
    department: "",
    phoneNo: "",

    title: "",
    subTitle: "",
    keywords: "",
    publicationDate: "",
    sourceORJournalName: "",
    volume: "",
    issue: "",
    DOI: "",
    URL: "",
    ISBN: "",
    ISSN: "",
    publisher: "",
}

const newDataSchema = Y.object({
    nameOfFaculty: Y.string().min(2).max(50).required("Please enter the name of faculty."),
    authEmail: Y.string().min(2).max(50).required("Please enter the email of faculty."),
    department: Y.string().min(2).max(50).required("Please enter the department."),
    phoneNo: Y.string().min(2).max(50).required("Please enter the phone number."),

    title: Y.string().min(2).max(50).required("Please enter the title."),
    subTitle: Y.string().min(2).max(50).required("Please enter the sub-title."),
    keywords: Y.string().min(2).max(50).required("Please enter keywords."),
    publicationDate: Y.string().min(2).max(50).required("Please enter publication date."),
    sourceORJournalName: Y.string().min(2).max(50).required("Please enter source or journal name."),
    volume: Y.string().min(2).max(50).required("Please enter the volume."),
    issue: Y.string().min(2).max(50).required("Please enter the issue."),
    DOI: Y.string().min(2).max(50).required("Please enter the DOI (Digital Object Identifier)."),
    URL: Y.string().min(2).url().required("Please enter the URL."),
    webTitle: Y.string().min(2).required("Please enter the website title."),
    ISBN: Y.string().min(2).required("Please enter the ISBN (for book)."),
    ISSN: Y.string().min(2).required("Please enter the ISSN (for journals)."),
    publisher: Y.string().min(2).required("Please enter the ISSN (for journals)."),
})

function search(source, name) {
    var results;

    name = name.toUpperCase();
    results = source.filter(function(entry) {
        return entry.nameOfFaculty.toUpperCase().indexOf(name) !== -1;
    });
    return results;
}

const Page = () => {
    const [facultyData, setFacultyData] = useState([])
    const [searchData, setSearchData] = useState("")
    const [paperPublicationsData, setPaperPublicationsData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const fcaData = facultyData.filter((d) => {
        return d.faculty.department == "fca"
    })

    const csData = facultyData.filter((d) => {
        return d.faculty.department == "cs"
    })

    const itData = facultyData.filter((d) => {
        return d.faculty.department == "it"
    })

    const options = [
        { value: 'journal', label: 'Journal' },
        { value: 'conference', label: 'Conference' },
        { value: 'seminar', label: 'Seminar' },
        { value: 'work shop', label: 'Work Shop' },
        { value: 'certification', label: 'Certification' },
        { value: 'book published', label: 'Book Published' },
    ]

    useEffect(() => {
        axios.get('/api/faculties').then(function (response) {
            setFacultyData(response.data.facultyData);
        }).catch(function (error) {
            console.log(error);
        });

        axios.get('/api/paperpublications').then(function (response) {
            console.log(response.data.paperPublicationsData);
            setPaperPublicationsData(response.data.paperPublicationsData);
            setFilteredData(response.data.paperPublicationsData);
        }).catch(function (error) {
            console.log(error);
        });
    }, [])

    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: newDataSchema,
        onSubmit: (values) => {
            axios.post('/api/paperpublications', values).then(function (response) {
                console.log(response);
                toast.success(response.data.message)
                window.location.reload();
            }).catch(function (error) {
                console.log(error);
                toast.error(error.response.data.message)
            });
        }
    })
  return (
    <>
        <div className="h-screen w-screen flex justify-start items-center flex-col">
            <Navbar/>

            <div className="overflow-auto rounded-lg w-[95vw] mt-6 md:mt-3 h-[80vh]">
                <div className="toolbar flex flex-col sm:flex-row justify-between mx-4 h-[4rem] items-center">
                    <div className="left w-full sm:w-auto mt-2 sm:mt-0">
                        <Input placeholder="Search here..." className="w-full !border" value={searchData} onChange={(e) => {
                            setSearchData(e.target.value)
                        }} 
                        onKeyUp={(e) => {
                            const res = paperPublicationsData.filter(function(entry) {
                                return entry.citation.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1;
                            });
                            console.log(res);
                            setFilteredData(res)
                        }}/>
                    </div>
                    <div className="right w-full sm:w-auto my-2 sm:my-0">
                        <Dialog>
                            <DialogTrigger className='w-full'><Button className="w-full">Add New Data</Button></DialogTrigger>
                            <DialogContent className="bg-[#1f2937] text-white">
                                <DialogHeader>
                                <DialogTitle className="text-[1.5rem]">Add New Data</DialogTitle>
                                </DialogHeader>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid w-full items-center gap-4 h-[20rem] overflow-y-auto">
                                            <h2 className="text-lg font-bold py-3">Author Information:</h2>
                                            <div className="flex flex-col space-y-1">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.nameOfFaculty} onChange={handleChange} onBlur={handleBlur} name="nameOfFaculty" id="nameOfFaculty" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="nameOfFaculty" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name of Faculty</label>
                                                </div>
                                                <p className="aitr_error">{errors.nameOfFaculty}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.authEmail} onChange={handleChange} onBlur={handleBlur} name="authEmail" id="authEmail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author Email</label>
                                                </div>
                                                <p className="aitr_error">{errors.authEmail}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.department} onChange={handleChange} onBlur={handleBlur} name="department" id="department" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
                                                </div>
                                                <p className="aitr_error">{errors.department}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.phoneNo} onChange={handleChange} onBlur={handleBlur} name="phoneNo" id="phoneNo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                                                </div>
                                                <p className="aitr_error">{errors.phoneNo}</p>
                                            </div>
                                            <h2 className="text-lg font-bold py-3">Publication Information:</h2>

                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.title} onChange={handleChange} onBlur={handleBlur} name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                                                </div>
                                                <p className="aitr_error">{errors.title}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.subTitle} onChange={handleChange} onBlur={handleBlur} name="subTitle" id="subTitle" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Subtitle</label>
                                                </div>
                                                <p className="aitr_error">{errors.subTitle}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.keywords} onChange={handleChange} onBlur={handleBlur} name="keywords" id="keywords" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Keywords</label>
                                                </div>
                                                <p className="aitr_error">{errors.keywords}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.publicationDate} onChange={handleChange} onBlur={handleBlur} name="publicationDate" id="publicationDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Publication Date</label>
                                                </div>
                                                <p className="aitr_error">{errors.publicationDate}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.sourceORJournalName} onChange={handleChange} onBlur={handleBlur} name="sourceORJournalName" id="sourceORJournalName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Source or Journal Name</label>
                                                </div>
                                                <p className="aitr_error">{errors.sourceORJournalName}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.volume} onChange={handleChange} onBlur={handleBlur} name="volume" id="volume" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Volume</label>
                                                </div>
                                                <p className="aitr_error">{errors.volume}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.issue} onChange={handleChange} onBlur={handleBlur} name="issue" id="issue" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Issue</label>
                                                </div>
                                                <p className="aitr_error">{errors.issue}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.DOI} onChange={handleChange} onBlur={handleBlur} name="DOI" id="DOI" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DOI (Digital Object Identifier)</label>
                                                </div>
                                                <p className="aitr_error">{errors.DOI}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.webTitle} onChange={handleChange} onBlur={handleBlur} name="webTitle" id="webTitle" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Website Title</label>
                                                </div>
                                                <p className="aitr_error">{errors.webTitle}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.URL} onChange={handleChange} onBlur={handleBlur} name="URL" id="URL" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Website URL</label>
                                                </div>
                                                <p className="aitr_error">{errors.URL}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.ISBN} onChange={handleChange} onBlur={handleBlur} name="ISBN" id="ISBN" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ISBN (for books)</label>
                                                </div>
                                                <p className="aitr_error">{errors.ISBN}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.ISSN} onChange={handleChange} onBlur={handleBlur} name="ISSN" id="ISSN" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ISSN (for journals)</label>
                                                </div>
                                                <p className="aitr_error">{errors.ISSN}</p>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="relative z-0 w-full mb-2 group">
                                                    <input type="text" values={values.publisher} onChange={handleChange} onBlur={handleBlur} name="publisher" id="publisher" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-400 !text-white/80 peer" placeholder="" required />
                                                    <label for="authEmail" className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 !text-white/80 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Publisher</label>
                                                </div>
                                                <p className="aitr_error">{errors.publisher}</p>
                                            </div>

                                        </div>
                                        <Button type="submit" className="w-full">
                                            Submit
                                        </Button>
                                    </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Table className="overflow-auto max-h-[80vh]">
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Citation</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            {
                                filteredData.length ? (
                                    filteredData.map((paperD, i) => {
                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{paperD.citation}</TableCell>
                                                    <TableCell><Button><LuDownload /></Button></TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    })
                                ) : (
                                    <>
                                        <TableRow>
                                            <TableCell>No Data Found</TableCell>
                                            <TableCell>No Data Found</TableCell>
                                        </TableRow>
                                    </>
                                )
                            }
                    </TableBody>
                </Table>

            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Page