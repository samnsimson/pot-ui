"use client";
import { FC, HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { signup } from "@/actions/auth-actions";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { UserCreateSchema } from "@/api/client";

interface SignupFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}
const phoneSchema = z
    .string()
    .transform((val) => val.replace(/[^\d]/g, ""))
    .refine((val) => val.length === 10, { message: "Phone number must be 10 digits" })
    .refine((val) => !val.startsWith("0"), { message: "Phone number cannot start with 0" })
    .refine((val) => !val.match(/^(\d)\1{9}$/), { message: "Phone number cannot be all repeating digits" });

const CreateUser = z.object({
    username: z
        .string()
        .min(3)
        .transform((val) => val.toLowerCase()),
    password: z.string().min(3).max(8),
    email: z
        .string()
        .email()
        .transform((val) => val.toLowerCase()),
    phone: phoneSchema,
});

export const SignupForm: FC<SignupFormProps> = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm<UserCreateSchema>({ resolver: zodResolver(CreateUser), defaultValues: { username: "", password: "" } });

    const handleSignup = async (signupData: UserCreateSchema) => {
        try {
            setIsLoading(true);
            const user = await signup(signupData);
            const result = await signIn("credentials", { redirect: false, email: signupData.email, password: signupData.password });
            if (result && result.ok) router.push("/dashboard");
        } catch (error) {
            console.log("🚀 ~ handleSignup ~ error:", error);
        } finally {
            setIsLoading(false);
        }
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
                <Button size="lg" className="w-full font-poppins font-bold" isLoading={isLoading} disabled={isLoading}>
                    <LogInIcon />
                    <span>Signup</span>
                </Button>

                <Button type="button" variant="link" className="w-full">
                    Already have an account? <Link href="/login">Login</Link>
                </Button>
            </form>
        </Form>
    );
};
