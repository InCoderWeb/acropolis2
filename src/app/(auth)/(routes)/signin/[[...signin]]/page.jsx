"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FaArrowRightLong } from "react-icons/fa6"
import { Label } from "@/components/ui/label"
import { signIn, useSession } from 'next-auth/react'
import { Checkbox } from "@/components/ui/checkbox"
import { useFormik } from "formik"
import * as Y from "yup"
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { redirect } from "next/navigation";

const initialValues = {
  email: "",
  password: "",
  rememberme: false,
}

const signInSchema = Y.object({
  email: Y.string().min(2).max(50).required("Please enter your email.").email("E-mail must be valid."),
  password: Y.string().min(8).max(50).required("Please enter your password."),
})

const Page = () => {
  const { status } = useSession()
  if(status == "authenticated") redirect("/")
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: (values) => {
      signIn("credentials", {...values, redirect: false}).then((callback) => {
          if(callback.error){
              toast.error(callback.error);
          }
      })
    }
  })
  return (
    <>
      <div className="aitr_SignInBox">
        <div className="aitr_SignInFormWrapper">
          <div className="aitr_SignInForm">
            <form onSubmit={handleSubmit}>
              <Card className="sm:w-[350px] mx-2 bg-gray-900 border-transparent text-white">
                <CardHeader className="text-center">
                  <CardTitle className="flex justify-center items-center">Acropolis FCA 
                      <motion.img
                        animate={{ rotate: [0, 15, 0] }}
                        transition={{
                          ease: "easeInOut",
                          duration: 1,
                          repeat: Infinity,
                        }}
                        className="loginSM:h-8 ml-2 h-[1.5rem] mt-1 loginSM:mt-0"
                        src={"/images/waving-hand.png"}
                        alt="waving Hand"
                      />
                  </CardTitle>
                  <CardDescription className="text-white/50">Manage all your acropolians data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" values={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="admin@acropolis.in" className="aitr_input" />
                        <p className="aitr_error">{errors.email}</p>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" values={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="********" className="aitr_input" />
                        <p className="aitr_error">{errors.password}</p>
                      </div>
                      <div className="flex">
                        <Checkbox id="rememberMe" name="rememberme" className="mr-1 border-white" />
                        <Label htmlFor="rememberMe" className="cursor-pointer">Remember me</Label>
                      </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="w-full bg-gray-600 hover:bg-gray-700" type="submit">Sign In <FaArrowRightLong className="ml-1 "/></Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page