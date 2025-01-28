"use client";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/schema/auth-schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { login } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type FormSchema = z.infer<typeof LoginSchema>;

export const LoginForm: FC<LoginFormProps> = ({}) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { username: "", password: "" },
    });

    const handleLogin = async (loginData: FormSchema) => {
        const { access_token } = await login(loginData);
        localStorage.setItem("access_token", access_token);
        redirect("/");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
                <FormField
                    name="username"
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
                    <span>Login</span>
                </Button>
            </form>
        </Form>
    );
};
