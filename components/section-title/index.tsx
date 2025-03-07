import { LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const SectionTitle: FC<SectionTitleProps> = ({ title, description, icon: Icon, ...props }) => {
    return (
        <div className="h-screen max-h-[72px]" {...props}>
            {(title || description) && (
                <div className="header p-3 w-full h-full flex items-center gap-3 bg-accent border-b border-border">
                    {Icon && <Icon size={32} className="text-slate-400" />}
                    <div>
                        {title && <h2>{title}</h2>}
                        {description && <p>{description}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};
