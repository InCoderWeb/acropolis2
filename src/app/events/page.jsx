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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"  

import { useFormik } from "formik"
import * as Y from "yup"
import axios from 'axios';
import { toast } from 'react-toastify';
  
const initialValues = {
    nameOfFaculty: "",
    stream: "",
    topic: "",
    rEvent: "",
    issnNo: "",
    linkD: "",
}

const newDataSchema = Y.object({
    nameOfFaculty: Y.string().min(2).max(50).required("Please select the name of faculty."),
    stream: Y.string().min(2).max(50).required("Please select stream."),
    topic: Y.string().min(2).max(50).required("Please enter topic."),
    rEvent: Y.string().min(2).max(50).required("Please select event."),
    issnNo: Y.number("You cannot enter text, please provide a valid ISSN no.").required("Please enter ISSN number."),
    linkD: Y.string().required("Please enter link."),
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

    const options = [
        { value: 'expert talk', label: 'Expert Talk' },
        { value: 'conference', label: 'Conference' },
        { value: 'seminar', label: 'Seminar' },
        { value: 'work shop', label: 'Work Shop' },
        { value: 'induction', label: 'Induction' },
    ]

    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: newDataSchema,
        onSubmit: (values) => {
            axios.post('/api/events', values).then(function (response) {
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

            <div className="bg-white/50 backdrop-blur-[3px] overflow-auto rounded-lg w-[95vw] mt-6 md:mt-3 h-[80vh]">
                <div className="toolbar flex flex-col sm:flex-row justify-between mx-4 h-[4rem] items-center">
                    <div className="left w-full sm:w-auto mt-2 sm:mt-0">
                        <Input placeholder="Search here..." className="w-full" value={searchData} onChange={(e) => {
                            setSearchData(e.target.value)
                        }} 
                        onKeyUp={(e) => {
                            const res = paperPublicationsData.filter(function(entry) {
                                return entry.nameOfFaculty.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1;
                            });
                            console.log(res);
                            setFilteredData(res)
                        }}/>
                    </div>
                    <div className="right w-full sm:w-auto my-2 sm:my-0">
                        <Dialog>
                            <DialogTrigger><Button className="w-full">Add New Event Data</Button></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle className="text-[1.5rem]">Add New Event Data</DialogTitle>
                                </DialogHeader>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid w-full gap-4 h-[20rem] overflow-y-auto">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="stream">Events</Label>
                                                <div className="rounded-xl border-2">
                                                    <Select value={values.stream} onValueChange={selectedOption => {
                                                        let event = {target: {name: 'stream', value: selectedOption}}
                                                        handleChange(event)
                                                    }}
                                                    onBlur={() => {
                                                        handleBlur({target: {name: 'stream'}});
                                                    }} name='stream'>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue className='uppercase' placeholder="Select Event" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    options.map((data, i) => {
                                                                        return (
                                                                            <SelectItem key={i} className="uppercase" value={data.value}>{data.label}</SelectItem>
                                                                        )
                                                                    })
                                                                }
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <p className="aitr_error">{errors.stream}</p>
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

                {/* <Table className="overflow-auto max-h-[80vh]">
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Stream</TableHead>
                            <TableHead>Topic</TableHead>
                            <TableHead>Research Event</TableHead>
                            <TableHead>ISSN No.</TableHead>
                            <TableHead>Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    </TableBody>
                </Table> */}

            </div>
        </div>
    </>
  )
}

export default Page