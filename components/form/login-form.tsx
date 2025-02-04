"use client";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schemas } from "@/lib/api-client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { login } from "@/actions/auth-actions";

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
	[x: string]: any;
}

type LoginSchema = z.infer<typeof schemas.Body_login>;

export const LoginForm: FC<LoginFormProps> = ({}) => {
	const form = useForm<LoginSchema>({
		resolver: zodResolver(schemas.Body_login),
		defaultValues: { username: "", password: "" },
	});

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
