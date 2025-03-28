"use client";
import { FC, HTMLAttributes, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { useFeedback } from "@/hooks/use-feedback";
import { AxiosError } from "axios";
import { Alert } from "@/components/ui/alert";
import { api } from "@/lib/api/client";
import { AppCreateSchema, AppOutSchema } from "@/api/client";

const AppCreate = z.object({ name: z.string().min(1, "Name is required"), is_active: z.boolean().optional() });
type AppCreateType = z.infer<typeof AppCreate>;
interface AppFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppForm: FC<AppFormProps> = ({ ...props }) => {
    const queryClient = useQueryClient();
    const { feedbackSuccess } = useFeedback();
    const [error, setError] = useState<string | null>(null);
    const form = useForm<AppCreateType>({ resolver: zodResolver(AppCreate), defaultValues: { name: "" } });

    const onSuccess = (data: AppOutSchema) => {
        if (error) setError(null);
        queryClient.setQueryData([queryKeys.GET_APPS], (apps: Array<AppOutSchema>) => [...apps, data]);
        feedbackSuccess({ title: "Success", description: "App created successfully!" });
        form.reset({ name: "" });
    };

    const onError = (error: AxiosError<any>) => {
        setError(error.response?.data?.detail);
    };

    const { mutate, isPending } = useMutation({ mutationFn: api.apps.createApp, onSuccess: ({ data }) => onSuccess(data), onError: onError });
    const handleSubmit = (data: AppCreateSchema) => mutate(data);

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
