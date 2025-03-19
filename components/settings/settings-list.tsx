"use client";
import { useAppContext } from "@/context/apps-context";
import { FC, HTMLAttributes, useState } from "react";
import { PageLoader } from "@/components/loader/page-loader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { AsteriskIcon, BanIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useConfirmation } from "@/hooks/use-confirmation";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "../copy-button";

interface SettingsListProps extends HTMLAttributes<HTMLDivElement> {
    slug: string;
    [x: string]: any;
}

export const SettingsList: FC<SettingsListProps> = ({ slug, ...props }) => {
    const { appData } = useAppContext();
    const [isSecretVisible, setIsSecretVisible] = useState(false);
    const { confirm } = useConfirmation({
        title: "Are you sure you want to delete the app?",
        description: "Deleting the app will delete all the contents and assets within this app.",
        confirmText: "Yes, Delete",
        cancelText: "Cancel",
        onConfirm: () => {},
    });
    if (!appData) return <PageLoader />;
    return (
        <div {...props}>
            <Table>
                <TableBody>
                    <TableRow className="border-b border-border bg-secondary font-semibold">
                        <TableCell colSpan={2}>App Detail</TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>App ID</TableCell>
                        <TableCell>{appData.id}</TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>App Name</TableCell>
                        <TableCell>{appData.name}</TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>App Secret</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <span className="flex">
                                    {isSecretVisible
                                        ? appData.secret
                                        : [...Array(appData.secret.length / 2)].map((_, idx) => <AsteriskIcon key={idx} size={12} />)}
                                </span>
                                <Button variant="ghost" size="icon" className="size-5 min-h-9 cursor-pointer" asChild>
                                    <EyeIcon size={16} onClick={() => setIsSecretVisible(!isSecretVisible)} />
                                </Button>
                                <CopyButton value={appData.secret} className="min-h-9" />
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>App Status</TableCell>
                        <TableCell>
                            <Badge variant={appData.is_active ? "success" : "destructive"}>{appData.is_active ? "Active" : "Inactive"}</Badge>
                        </TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>Created At</TableCell>
                        <TableCell>{format(parseISO(appData.created_at), "LLL dd, yyyy HH:mm")}</TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>Last Modified</TableCell>
                        <TableCell>{format(parseISO(appData.updated_at), "LLL dd, yyyy HH:mm")}</TableCell>
                    </TableRow>
                    <TableRow className="border-y border-border bg-secondary font-semibold">
                        <TableCell colSpan={2}>App Permissions</TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>Allow Write: (Content)</TableCell>
                        <TableCell>
                            <Switch />
                        </TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>Allow Edit: (Content)</TableCell>
                        <TableCell>
                            <Switch />
                        </TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>Allow Write: (Document)</TableCell>
                        <TableCell>
                            <Switch />
                        </TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>Allow Edit: (Document)</TableCell>
                        <TableCell>
                            <Switch />
                        </TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>Allow Write: (Media)</TableCell>
                        <TableCell>
                            <Switch />
                        </TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell>Allow Edit: (Media)</TableCell>
                        <TableCell>
                            <Switch />
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-y border-border bg-secondary font-semibold">
                        <TableCell colSpan={2}>App Actions</TableCell>
                    </TableRow>
                    <TableRow className="h-12 border-none">
                        <TableCell colSpan={2} className="space-x-3 p-3">
                            <Button variant="outline" type="button">
                                <BanIcon size={16} />
                                <span>Disable</span>
                            </Button>
                            <Button variant="destructive" type="button" onClick={confirm}>
                                <TrashIcon size={16} />
                                <span>Delete App</span>
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
