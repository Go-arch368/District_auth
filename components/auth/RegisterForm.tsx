"use client"
import React from 'react'
import * as z from "zod"
import { useTransition ,useState} from 'react'
import { RegisterSchema } from '@/schemas'
import { Input } from '../ui/input'
import { CardWrapper } from './CardWrapper'
import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { register } from '@/actions/register'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "../ui/form"
const RegisterForm = () => {

   const [isPending,startTransition] = useTransition()
   const [error,setError] = useState<string|undefined>("")
   const [success,setSuccess] = useState<string|undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            email:"",
            password:"",
            name:""
        }
    })

    const onSubmit = (values:z.infer<typeof RegisterSchema>)=>{
        startTransition(()=>{
            register(values)
             .then((data)=>{
                setError(data.error)
                setSuccess(data.success)
             })
             
        })
       
        
    }

  return (
    <CardWrapper 
       headerLabel='Create an account'
       backButtonLabel='Already have an account'
       backButtonHref='/auth/login'
       showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
            <FormField
                  control={form.control}
                  name="name"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input  {...field} placeholder="johndoe" type="name" disabled={isPending}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                />
          <FormField
             control={form.control}
             name='email'
             render={({field})=>(
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input  {...field} placeholder='johndoe@gmail.com' type="email" disabled={isPending}/>
                    </FormControl>
                    <FormMessage/>

                    
                </FormItem>
             )}
           />
           <FormField
             control={form.control}
             name='password'
             render={({field})=>(
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input  {...field} placeholder='******' type="password" disabled={isPending}/>
                    </FormControl>
                    <FormMessage/>

                    
                </FormItem>
             )}
           />
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type='submit' className='w-full' disabled={isPending}>Create an Account</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm
