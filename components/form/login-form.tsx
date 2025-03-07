"use client";
import { FC, HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schemas } from "@/lib/api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type LoginSchema = z.infer<typeof schemas.Body_login>;

export const LoginForm: FC<LoginFormProps> = ({}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm<LoginSchema>({ resolver: zodResolver(schemas.Body_login), defaultValues: { username: "", password: "" } });

    const login = async ({ username, password }: LoginSchema) => {
        setIsLoading(true);
        const result = await signIn("credentials", { redirect: false, email: username, password });
        if (result?.ok) router.push("/");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-8">
                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input id="username" type="text" placeholder="user@example.com" autoComplete="username" {...field} />
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
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                                <Input id="password" aria-label="password" type="password" autoComplete="current-password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button size="lg" className="w-full font-poppins font-bold" isLoading={isLoading}>
                    <LogInIcon />
                    <span>Login</span>
                </Button>
            </form>
        </Form>
    );
};
