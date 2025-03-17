"use client";
import { FC, HTMLAttributes, useState } from "react";
import { PageLoader } from "../loader/page-loader";
import { DataTable } from "../data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useAppContext } from "@/context/apps-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, UserPlusIcon } from "lucide-react";

interface AppUsersProps extends HTMLAttributes<HTMLDivElement> {
    slug: string;
}

type UserTableView = {
    username: string;
    email: string;
};

export const AppUsersList: FC<AppUsersProps> = ({ slug, ...props }) => {
    const { appUsers: users } = useAppContext();
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const columns: Array<ColumnDef<UserTableView>> = [
        {
            accessorKey: "username",
            header: "Username",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
    ];

    if (!users) return <PageLoader />;
    return (
        <div {...props}>
            <div className="flex items-center justify-between p-3">
                <div className="flex w-full max-w-lg items-center">
                    <Input type="text" placeholder="Search for users" className="rounded-none" onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button variant="success" className="rounded-none">
                        <SearchIcon size={16} />
                    </Button>
                </div>
                <div>
                    <Button variant="link" className="gap-3">
                        <UserPlusIcon />
                        <span>Add Users</span>
                    </Button>
                </div>
            </div>
            <DataTable columns={columns} data={users} searchTerm={searchTerm} />
        </div>
    );
};
