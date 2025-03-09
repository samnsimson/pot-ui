"use client";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { z } from "zod";

interface ContentCreateFormProps extends HTMLAttributes<HTMLDivElement> {
    onCancel: () => void;
}

const ContentCreateSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
});

type ContentCreateType = z.infer<typeof ContentCreateSchema>;

export const ContentCreateForm: FC<ContentCreateFormProps> = ({ onCancel }) => {
    const form = useForm<ContentCreateType>({ defaultValues: { name: "" } });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})} className="inline-flex flex-col gap-2">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="inline-flex">
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" onClick={onCancel} className="w-full">
                        <XIcon size={16} />
                    </Button>
                    <Button type="submit" variant="outline" className="w-full">
                        <CheckIcon size={16} />
                    </Button>
                </div>
            </form>
        </Form>
    );
};
