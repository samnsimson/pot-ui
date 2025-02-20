"use client";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { schemas } from "@/lib/api-client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AppFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type AppFormSchema = z.infer<typeof schemas.AppCreateSchema>;

export const AppForm: FC<AppFormProps> = ({}) => {
    const form = useForm<AppFormSchema>({ resolver: zodResolver(schemas.AppCreateSchema), defaultValues: { name: "" } });
    return (
        <Form {...form}>
            <form onSubmit={() => null} className="flex flex-col gap-6">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ ...field }) => (
                        <FormItem>
                            <FormLabel>App Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="My Awesome App" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size="lg">
                    Create App
                </Button>
            </form>
        </Form>
    );
};
