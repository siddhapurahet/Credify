'use client'
import React, { use, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Divide } from 'lucide-react'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import CustomInput from './CustomInput'

const AuthForm = ({type}: {type: string}) => {

    const [user, setUser] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const formSchema = authFormSchema(type);

    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setisLoading(true);
    console.log(values)
    setisLoading(false);
  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='cursor-pointer flex items-center gap-2 gap-1'>
                    <Image 
                        src="/icons/logo.svg" 
                        alt="Credify logo"
                        height={34}
                        width={34}
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Credify</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>{user
                        ? 'Link Account'
                        : type == 'sign-in'
                            ? 'Sign In'
                            : 'Sign Up'
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user
                                ? 'Link your account to get started'
                                : 'Please enter your details'
                            }
                        </p>
                    </h1>
                </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                {/* {compnent to link bank account} */}
            </div>
        ) : (
            <> 
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        
                        {type === 'sign-up' && (
                            <>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='firstName' id='firstName' label='First Name' placeholder='Enter your first name'/>
                                    <CustomInput control={form.control} name='lastName' id='lastName' label='Last Name' placeholder='Enter your last name'/>
                                </div>
                                    <CustomInput control={form.control} name='address1' id='address' label='Address' placeholder='Enter your Address'/>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='state' id='state' label='State' placeholder='Example: Washington'/>
                                    <CustomInput control={form.control} name='postalCode' id='postalCode' label='Postal Code' placeholder='Example: 12054'/>
                                </div>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='dateOfBirth' id='dateOfBirth' label='Date of Birth' placeholder='DD-MM-YYYY'/>
                                    <CustomInput control={form.control} name='ssn' id='ssn' label='SSN' placeholder='Example: 3265'/>
                                </div>
                            </>
                        )}

                        <CustomInput control={form.control} name='email' id='email' label="Email" placeholder='Enter your email' />

                        <CustomInput control={form.control} name='password' id='password' label="Password" placeholder='Enter your password' />
                        
                        
                        {/* <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <div className='form-item'>
                                    <FormLabel className='form-label'>Email</FormLabel>
                                    <div className='flex w-full flex-col'>
                                        <FormControl>
                                            <Input 
                                                placeholder='Enter your email'
                                                className='input-class'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='form-message mt-2' />
                                    </div>
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <div className='form-item'>
                                    <FormLabel className='form-label'>Password</FormLabel>
                                    <div className='flex w-full flex-col'>
                                        <FormControl>
                                            <Input 
                                                placeholder='Enter your password'
                                                className='input-class'
                                                type='password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='form-message mt-2' />
                                    </div>
                                </div>
                            )}
                        /> */}

                        <div className='flex flex-col gap-4'>
                        <Button type="submit" className='form-btn' disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' /> &nbsp;
                                    Loading...
                                </>
                            ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        </Button>
                        </div>
                    </form>
                </Form>

                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600">
                        {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <Link href={type === 'sign-in' ? "/sign-up" : "/sign-in"} className='form-link'>
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                    </Link>
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm