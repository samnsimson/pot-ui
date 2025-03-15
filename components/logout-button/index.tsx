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
            className={cn("rounded-none w-full min-h-12 flex gap-3 items-center justify-center", className)}
            onClick={async () => await signOut({ redirect: true, callbackUrl: "/login" })}
            {...props}
        >
            <span>Log out</span>
            <LogOutIcon size={24} />
        </Button>
    );
};
