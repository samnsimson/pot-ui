"use client";
import { useQuery } from "@tanstack/react-query";
import { FC, HTMLAttributes } from "react";
import { PageLoader } from "../loader/page-loader";
import { DataTable } from "../data-table";
import { ColumnDef } from "@tanstack/react-table";
import { client } from "@/actions/client-actions";

interface AppUsersProps extends HTMLAttributes<HTMLDivElement> {
    appId: string;
}

type UserTableView = {
    username: string;
    email: string;
};

export const AppUsers: FC<AppUsersProps> = ({ appId, ...props }) => {
    const { data: users } = useQuery({ queryKey: ["app-users", appId], queryFn: () => client.getAppUsers(appId), enabled: true });

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
            <DataTable columns={columns} data={users} />
        </div>
    );
};
