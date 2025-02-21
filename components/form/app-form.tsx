"use client";
import { FC, HTMLAttributes } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@/lib/api-client";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createApp } from "@/actions/apps-actions";

type AppFormType = z.infer<typeof schemas.AppCreateSchema>;
interface AppFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppForm: FC<AppFormProps> = ({ ...props }) => {
    const form = useForm<AppFormType>({ resolver: zodResolver(schemas.AppCreateSchema), defaultValues: { name: "" } });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(createApp)} className="flex flex-col gap-6">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>App name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="You app name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button size="lg" type="submit">
                    Create App
                </Button>
            </form>
        </Form>
    );
};
