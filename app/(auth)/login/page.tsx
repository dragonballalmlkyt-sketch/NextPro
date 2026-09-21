"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginSchema } from "../../schemas/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input"; // تصحيح استيراد الحقل
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

type LoginValues = z.infer<typeof loginSchema>; 

export default function Login() {


    const Router = useRouter();

    const [isPending, startTransition] = useTransition();


    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    });

    function handlesubmit(data: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            await authClient.signIn.email({
            email: data.email,
            password: data.password,
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged in successfully!");
                    Router.replace("/");
                },
                onError: (error) => {
                    toast.error(`Error logging in: ${error.error.Message}`);
                }
            }
        
        })

    })

    
    }
    

    return (
    <Card >
        <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={form.handleSubmit(handlesubmit)} className="space-y-4">
            <FieldGroup className="space-y-4">

                {/* Email Field */}
                <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} placeholder="email@example.com" {...field} />
                    {fieldState.error && (
                        <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                        </p>
                    )}
                    </Field>
                )}
                />

                {/* Password Field */}
                <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} type="password" placeholder="******" {...field} />
                    {fieldState.error && (
                        <p className="text-sm text-destructive mt-1">
                        {fieldState.error.message}
                        </p>
                    )}
                    </Field>
                )}
                />
            </FieldGroup>

                <Button type="submit" className="w-full mt-4" disabled={isPending} >
                {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                        </>
                        ) : (
                        "Login"
                        )}
                </Button>
            </form>
        </CardContent>
        </Card>
    );
    }