"use client";
import { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
import { ContentActionButtons } from "@/components/content/action-buttons";
import { useQueryState } from "nuqs";
import { useAppContext } from "@/context/apps-context";
import { Content, ContentUpdate } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageLoader } from "@/components/loader/page-loader";
import { NoContentData } from "./no-content-data";
import { cn } from "@/lib/utils";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { mutationKeys } from "@/constants/mutation-keys";
import { useFeedback } from "@/hooks/use-feedback";
import { CopyButton } from "../copy-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api/client";

interface ContentDataProps extends HTMLAttributes<HTMLDivElement> {
    slug: string;
    [x: string]: any;
}

const ContentFormDataSchema = z.object({
    fields: z.array(
        z.object({
            key: z.string({ required_error: "Key is required" }).min(1, "key cannot be empty"),
            value: z.any({ required_error: "Value is required" }),
        }),
    ),
});

type ContentData = Record<string, any> | null;
type ContentFormData = z.infer<typeof ContentFormDataSchema>;
type MutaionProps = { appId: string; contentId: string; data: ContentUpdate };

const contentCache = new Map<string, ContentData>();

const getContentData = (content: Array<Content> | undefined, id: string): ContentData => {
    if (contentCache.has(id)) return contentCache.get(id)!;
    if (!content || content.length === 0) return null;
    const queue: Content[] = [...content];
    while (queue.length) {
        const current = queue.shift()!;
        if (current.children) queue.push(...current.children);
        if (current.id === id) {
            const data = current.data as ContentData;
            contentCache.set(id, data);
            return data;
        }
    }
    return null;
};

const mapObject = (data: ContentData | undefined) => {
    if (!data) return [{ key: "", value: "" }];
    return Object.entries(data).map(([key, value]) => ({ key, value }));
};

export const ContentData: FC<ContentDataProps> = ({ slug, ...props }) => {
    const queryClient = useQueryClient();
    const [contentId] = useQueryState("id");
    const { appData, appContent } = useAppContext();
    const [action, setAction] = useQueryState("action");
    const [contentData, setContentData] = useState<ContentData | undefined>(undefined);
    const [expandedCell, setExpandedCell] = useState<string | null>(null);
    const isCreating = useMemo(() => action === "create", [action]);
    const isEditing = useMemo(() => action === "edit", [action]);
    const isFormMode = useMemo(() => isCreating || isEditing, [isCreating, isEditing]);
    const form = useForm<ContentFormData>({ resolver: zodResolver(ContentFormDataSchema), defaultValues: { fields: [] } });
    const { control, handleSubmit, register, setValue } = form;
    const { fields, append, remove } = useFieldArray({ control, name: "fields" });
    const { feedbackSuccess, feedbackFailure } = useFeedback();

    useEffect(() => setContentData(contentId ? getContentData(appContent, contentId) : undefined), [contentId, appContent]);
    useEffect(() => setValue("fields", mapObject(contentData)), [contentData, setValue]);

    const { mutate: updateContent, isPending: isUpdating } = useMutation({
        mutationKey: [mutationKeys.UPDATE_CONTENT],
        mutationFn: ({ appId, contentId, data }: MutaionProps) => api.content.updateContent(appId, contentId, data),
        onError: () => feedbackFailure({ title: "Oops", description: `Error while ${isCreating ? "creating" : "updating"} content` }),
        onSuccess: async () => {
            contentCache.clear();
            await queryClient.invalidateQueries({ queryKey: [queryKeys.GET_APP_CONTENT, slug] });
            feedbackSuccess({ title: "Success!", description: `Content ${isCreating ? "created" : "updated"} successfully` });
            setAction(null);
        },
    });

    const truncatedValue = (key: string, text: string) => {
        const isExpanded = expandedCell === key;
        return (
            <div
                className={cn("cursor-pointer", { truncate: !isExpanded })}
                title={isExpanded ? "" : text}
                onClick={() => setExpandedCell(isExpanded ? null : key)}
            >
                {text}
            </div>
        );
    };

    const saveFormData = (formData: ContentFormData) => {
        const dataObj: Record<string, any> = {};
        const nonEmptyFields = formData.fields.filter((x) => !!x.key.trim());
        nonEmptyFields.forEach(({ key, value }) => (dataObj[key] = value));
        if (appData && contentId) updateContent({ appId: appData.id, contentId, data: { data: dataObj } });
    };

    if (!appData) return <PageLoader />;
    if (contentData === undefined) return <p>Select a content</p>;
    if (contentData === null && !isFormMode) return <NoContentData action={setAction} />;

    return (
        <div {...props}>
            <form onSubmit={handleSubmit(saveFormData)} className="divide-y border-b border-border">
                <ContentActionButtons isFormMode={isFormMode} isUpdating={isUpdating} onCancel={setAction} appId={appData.id} contentId={contentId} />
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow className="bg-secondary hover:bg-secondary">
                            <TableHead className="w-[30%]">Key</TableHead>
                            <TableHead className="w-[60%]">Value</TableHead>
                            <TableHead className="w-[10%] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fields.map((field, index) => (
                            <TableRow key={field.id}>
                                <TableCell className="w-[30%]">
                                    {isFormMode ? <Input {...register(`fields.${index}.key`)} /> : truncatedValue(`key-${field.id}`, field.key)}
                                </TableCell>
                                <TableCell className="w-[60%]">
                                    {isFormMode ? <Input {...register(`fields.${index}.value`)} /> : truncatedValue(`key-${field.id}`, field.value)}
                                </TableCell>
                                <TableCell className="w-[10%] text-right">
                                    {isFormMode ? (
                                        <Button type="button" variant="ghost" className="h-8 w-8 rounded-md p-0" onClick={() => remove(index)}>
                                            <TrashIcon width={16} height={16} />
                                        </Button>
                                    ) : (
                                        <CopyButton value={JSON.stringify({ [field.key]: field.value })} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {isFormMode && fields.length === 0 && (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={3} className="py-6 text-center">
                                    <h2 className="font-bold">Add your first field</h2>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    {isFormMode && (
                        <TableCaption className="m-0 border-t border-border p-0">
                            <div className="flex items-center justify-between">
                                <Button type="button" variant="secondary" className="border-r border-border" onClick={() => append({ key: "", value: "" })}>
                                    <PlusIcon className="mr-1 h-4 w-4" /> Add Field
                                </Button>
                            </div>
                        </TableCaption>
                    )}
                </Table>
            </form>
        </div>
    );
};
