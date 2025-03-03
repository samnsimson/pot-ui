"use client";
import { cva, VariantProps } from "class-variance-authority";
import { FC, ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes, useState } from "react";
import { Button } from "../ui/button";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

const gridStyles = cva("grid", {
    variants: {
        gap: {
            none: "gap-0",
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-6",
            xl: "gap-8",
        },
    },
    defaultVariants: {
        gap: "none",
    },
});

type Fallback = {
    text: string;
    action: () => void;
};

type Columns = {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
};

interface GridViewProps<T> extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridStyles> {
    data: T[];
    title?: string;
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    description?: string;
    renderItem: (item: T, index: number) => ReactNode;
    renderPrefix?: () => ReactNode;
    renderSuffix?: () => ReactNode;
    fallback?: Fallback;
    columns?: Columns;
    isLoading?: boolean;
}

export const GridView = <T,>({
    title,
    description,
    data,
    icon: Icon,
    renderItem,
    renderPrefix,
    renderSuffix,
    fallback,
    columns,
    gap,
    className,
    isLoading,
    ...props
}: GridViewProps<T>) => {
    const columnClasses = (columns?: Columns) => {
        if (!columns) return "";
        const { sm, md, lg, xl } = columns;
        const classes = [];
        if (sm) classes.push(`grid-cols-${sm}`);
        if (md) classes.push(`md:grid-cols-${md}`);
        if (lg) classes.push(`lg:grid-cols-${lg}`);
        if (xl) classes.push(`xl:grid-cols-${xl}`);
        return classes.join(" ");
    };

    return (
        <div id="ui-grid-view" className="flex flex-col gap-3">
            {(title || description) && (
                <div className="header py-3 w-full flex items-center gap-3">
                    {Icon && <Icon size={32} className="text-slate-400" />}
                    <div>
                        {title && <h2>{title}</h2>}
                        {description && <p>{description}</p>}
                    </div>
                </div>
            )}
            {data.length > 0 ? (
                <div className={cn(gridStyles({ gap }), "grid-cols-6", className)} {...props}>
                    {renderPrefix && <div>{renderPrefix()}</div>}
                    {data.map((item, index) => (
                        <div key={index}>{renderItem(item, index)}</div>
                    ))}
                    {renderSuffix && <div>{renderSuffix()}</div>}
                </div>
            ) : fallback ? (
                <div className="flex flex-col items-center justify-center gap-6 h-full w-full">
                    <h3>No content</h3>
                    <Button size="lg" onClick={() => fallback.action()}>
                        {fallback.text}
                    </Button>
                </div>
            ) : null}
        </div>
    );
};
