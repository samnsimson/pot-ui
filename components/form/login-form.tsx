"use client";
import { FC, HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert } from "../ui/alert";

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

const LoginSchema = z.object({
    username: z.string({ required_error: "Username is required" }).min(3, "Username must be minimum 3 characters long"),
    password: z.string({ required_error: "Password is required" }).min(3, "Password must be minimum 3 characters long"),
});

type LoginType = z.infer<typeof LoginSchema>;

export const LoginForm: FC<LoginFormProps> = ({}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const form = useForm<LoginType>({ resolver: zodResolver(LoginSchema), defaultValues: { username: "", password: "" } });

    const login = async ({ username, password }: LoginType) => {
        try {
            setIsLoading(true);
            const result = await signIn("credentials", { redirect: false, email: username, password });
            if (!result || !result.ok) return setError("Wrong credentials");
            setError(null);
            router.push("/");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-8">
                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
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
                {error && <Alert variant="destructive">{error}</Alert>}
            </form>
        </Form>
    );
};
