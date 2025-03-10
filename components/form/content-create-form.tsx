"use client";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ContentCreateFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

const ContentCreateSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(3, "Name must be minimum 2 characters long"),
});

type ContentCreateType = z.infer<typeof ContentCreateSchema>;

export const ContentCreateForm: FC<ContentCreateFormProps> = ({}) => {
    const form = useForm<ContentCreateType>({ resolver: zodResolver(ContentCreateSchema), defaultValues: { name: "" } });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})} className="flex flex-col gap-2">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-2">
                    <Button type="submit" variant="success" className="w-full">
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    );
};
