"use client";

import * as z from 'zod'
import CardWrapper from "./card-wrapper"
import { LoginSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../form-error';
import FormSucess from '../form-success';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';

const LoginForm = () => {
    const [isPending, setTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        setTransition(() => { 
            login(values)
                .then((data)=>{
                    setError(data?.error)
                    setSuccess(data?.success)
                })
        });
    }

    return (
        <CardWrapper backButtonLabel="Don't have an account" backButtonHref="/auth/register" headerLable="Welcome Back" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-4'>
                    <div className=' space-y-2'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="abc@gmail.com"
                                            type='email'
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type='password'
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSucess message={success} />
                    <Button size="lg" type='submit' className='w-full' disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm