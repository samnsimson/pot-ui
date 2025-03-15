import { Icon } from "@/lib/types";
import { FC, HTMLAttributes, ReactNode } from "react";

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
    sectionTitle: string | ReactNode;
    description?: string | ReactNode;
    icon?: Icon;
}

export const SectionTitle: FC<SectionTitleProps> = ({ sectionTitle, description, icon: Icon, ...props }) => {
    return (
        <div className="h-[72px]" {...props}>
            {(sectionTitle || description) && (
                <div className="header flex h-full w-full items-center gap-3 border-b border-border bg-accent p-3">
                    {Icon && <Icon size={32} className="text-slate-400" />}
                    <div>
                        {sectionTitle && <h2>{sectionTitle}</h2>}
                        {description && <p>{description}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};
