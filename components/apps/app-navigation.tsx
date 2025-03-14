"use client";
import { FC, HTMLAttributes } from "react";
import { DatabaseIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppsNavigationProps extends HTMLAttributes<HTMLDivElement> {
    slug: string;
}
const navs = [
    {
        name: "Content",
        icon: DatabaseIcon,
        link: "content",
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

export const AppsNavigation: FC<AppsNavigationProps> = ({ slug, ...props }) => {
    const pathname = usePathname();
    return (
        <div className="flex items-center min-h-12 divide-x border-b border-border bg-accent">
            {navs.map(({ name, link, icon: Icon }, idx) => {
                const fullPath = `/app/${slug}/${link}`;
                const isActive = pathname === fullPath;
                return (
                    <Button key={idx} className="rounded-none font-semibold" variant={isActive ? "success" : "muted"} asChild>
                        <Link href={`/app/${slug}/${link}`} className="inline-flex items-center gap-3">
                            <Icon size={18} /> <span>{name}</span>
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
};
