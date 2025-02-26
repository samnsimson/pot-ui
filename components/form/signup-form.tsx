"use client";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schemas } from "@/lib/api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { signup } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

interface SignupFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type SignupSchema = z.infer<typeof schemas.UserCreateSchema>;

export const SignupForm: FC<SignupFormProps> = ({}) => {
    const form = useForm<SignupSchema>({
        resolver: zodResolver(schemas.UserCreateSchema),
        defaultValues: { username: "", password: "" },
    });

    const handleSignup = async (signupData: SignupSchema) => {
        const user = await signup(signupData);
        console.log("🚀 ~ handleSignup ~ user:", user);
        redirect("/");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-8">
                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="johndoe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="user@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="domain.name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Domain Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="My First App" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="domain.host"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Host name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="my-first-app" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button size="lg" className="w-full font-poppins font-bold">
                    <LogInIcon />
                    <span>Signup</span>
                </Button>
            </form>
        </Form>
    );
};
