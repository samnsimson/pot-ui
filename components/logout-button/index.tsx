"use client";
import { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

interface LogoutButtonProps extends HTMLAttributes<HTMLButtonElement> {
    [x: string]: any;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ className, ...props }) => {
    return (
        <Button
            variant="destructive"
            className={cn("flex min-h-12 w-full items-center justify-center gap-3 rounded-none", className)}
            onClick={async () => await signOut({ redirect: true, callbackUrl: "/login" })}
            {...props}
        >
            <span>Log out</span>
            <LogOutIcon size={24} />
        </Button>
    );
};
