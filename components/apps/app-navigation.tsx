"use client";
import { FC, HTMLAttributes } from "react";
import { CodeIcon, FilesIcon, ImagesIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface AppsNavigationProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}
const navs = [
    {
        name: "Content",
        icon: CodeIcon,
        link: "content",
    },
    {
        name: "Documents",
        icon: FilesIcon,
        link: "documents",
    },
    {
        name: "Media",
        icon: ImagesIcon,
        link: "media",
    },
    {
        name: "Users",
        icon: UserIcon,
        link: "users",
    },
    {
        name: "Settings",
        icon: SettingsIcon,
        link: "settings",
    },
];

export const AppsNavigation: FC<AppsNavigationProps> = ({ ...props }) => {
    const { slug } = useParams();
    const pathname = usePathname();
    return (
        <div className="flex min-h-12 items-center divide-x border-b border-border bg-accent" {...props}>
            {navs.map(({ name, link, icon: Icon }, idx) => {
                const fullPath = `/dashboard/apps/${slug}/${link}`;
                const isActive = pathname.includes(fullPath);
                return (
                    <Button key={idx} className="rounded-none font-semibold" variant={isActive ? "tab" : "muted"} asChild>
                        <Link href={`/dashboard/apps/${slug}/${link}`} className="inline-flex items-center gap-3">
                            <Icon size={18} /> <span>{name}</span>
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
};
