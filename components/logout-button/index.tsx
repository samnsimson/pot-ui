"use client";
import { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth-actions";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";

interface LogoutButtonProps extends HTMLAttributes<HTMLButtonElement> {
    [x: string]: any;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ className, ...props }) => {
    return (
        <Button
            variant="destructive"
            className={cn("rounded-none w-full min-h-12 max-w-32 flex gap-3 items-center justify-center", className)}
            onClick={logout}
            {...props}
        >
            <span>Log out</span>
            <LogOutIcon size={24} />
        </Button>
    );
};
