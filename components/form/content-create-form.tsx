"use client";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFeedback } from "@/hooks/use-feedback";
import { ApiError } from "@/lib/types";
import { queryKeys } from "@/constants/query-keys";
import { api } from "@/lib/api/client";
interface ContentCreateProps {
    appId: string;
    name: string;
    parentId?: string;
}
interface ContentCreateFormProps extends HTMLAttributes<HTMLDivElement> {
    appId?: string | undefined;
    parentId?: string;
    slug: string;
}

const ContentCreateSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(3, "Name must be minimum 2 characters long"),
});

type ContentCreateType = z.infer<typeof ContentCreateSchema>;

export const ContentCreateForm: FC<ContentCreateFormProps> = ({ appId = "", slug, parentId = undefined }) => {
    const queryClient = useQueryClient();
    const { feedbackSuccess, feedbackFailure } = useFeedback();
    const form = useForm<ContentCreateType>({ resolver: zodResolver(ContentCreateSchema), defaultValues: { name: "" } });

    const { mutate: createAppContent, isPending: isCreatingContent } = useMutation({
        mutationFn: ({ appId, name, parentId }: ContentCreateProps) => api.content.createContent(appId, { name, parent_id: parentId }),
        onError: (error: ApiError) => feedbackFailure({ title: "Oops!", description: error.response?.data.detail }),
        onSuccess: ({ data }) => {
            form.reset({ name: "" });
            queryClient.invalidateQueries({ queryKey: [queryKeys.GET_APP_CONTENT, slug] });
            feedbackSuccess({ title: "Success", description: "Content deleted successfully!" });
        },
    });

    const handleSubmit = ({ name }: ContentCreateType) => appId && createAppContent({ appId, parentId, name });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content Name</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription>Enter the name of the content</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-2">
                    <Button type="submit" variant="success" className="w-full rounded-md" disabled={isCreatingContent} isLoading={isCreatingContent}>
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    );
};
