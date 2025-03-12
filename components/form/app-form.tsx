"use client";
import { FC, HTMLAttributes, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@/lib/api";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { useFeedback } from "@/hooks/use-feedback";
import { client } from "@/actions/client";
import { AxiosError } from "axios";
import { Alert } from "../ui/alert";

type AppCreate = z.infer<typeof schemas.AppCreateSchema>;
type App = z.infer<typeof schemas.AppOutSchema>;
interface AppFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppForm: FC<AppFormProps> = ({ ...props }) => {
    const queryClient = useQueryClient();
    const { feedbackSuccess } = useFeedback();
    const [error, setError] = useState<string | null>(null);
    const form = useForm<AppCreate>({ resolver: zodResolver(schemas.AppCreateSchema), defaultValues: { name: "" } });

    const onSuccess = (data: App) => {
        if (error) setError(null);
        queryClient.setQueryData([queryKeys.GET_APPS], (apps: Array<App>) => [...apps, data]);
        feedbackSuccess({ title: "Success", description: "App created successfully!" });
        form.reset({ name: "" });
    };

    const onError = (error: AxiosError<any>) => {
        setError(error.response?.data?.detail);
    };

    const { mutate, isPending } = useMutation({ mutationFn: client.createApp, onSuccess: onSuccess, onError: onError });
    const handleSubmit = (data: AppCreate) => mutate(data);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
                {error && <Alert variant="destructive">{error}</Alert>}
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
