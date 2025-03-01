"use client";
import { FC, HTMLAttributes } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@/lib/api";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/http-client";
import { queryKeys } from "@/constants/query-keys";

type AppFormType = z.infer<typeof schemas.AppCreateSchema>;
type AppsType = z.infer<typeof schemas.AppOutSchema>;
interface AppFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppForm: FC<AppFormProps> = ({ ...props }) => {
    const queryClient = useQueryClient();
    const form = useForm<AppFormType>({ resolver: zodResolver(schemas.AppCreateSchema), defaultValues: { name: "" } });
    const onSuccess = (data: AppsType) => queryClient.setQueryData([queryKeys.GET_APPS], (apps: Array<AppsType>) => [...apps, data]);
    const { mutate, isPending } = useMutation({ mutationFn: api.createApp, onSuccess: onSuccess });

    const handleSubmit = (data: AppFormType) => mutate(data);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
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
                <Button size="lg" type="submit" isLoading={isPending}>
                    Create App
                </Button>
            </form>
        </Form>
    );
};
