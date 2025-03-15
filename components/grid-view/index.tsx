"use client";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { SectionTitle } from "../section-title";
import { Icon } from "@/lib/types";

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
    icon?: Icon;
    description?: string;
    renderItem: (item: T, index: number) => ReactNode;
    renderPrefix?: () => ReactNode;
    renderSuffix?: () => ReactNode;
    fallback?: Fallback;
    columns?: Columns;
    isLoading?: boolean;
}

export const GridView = <T,>({
    title = "",
    description,
    data,
    icon,
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
        <div id="ui-grid-view" className="flex flex-col">
            <SectionTitle sectionTitle={title} description={description} icon={icon} />
            {data.length > 0 ? (
                <div className={cn("divide-x", gridStyles({ gap }), "grid-cols-6", className)} {...props}>
                    {renderPrefix && <div>{renderPrefix()}</div>}
                    {data.map((item, index) => (
                        <div key={index} className="border-b border-border">
                            {renderItem(item, index)}
                        </div>
                    ))}
                    {renderSuffix && <div>{renderSuffix()}</div>}
                </div>
            ) : fallback ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-6">
                    <h3>No content</h3>
                    <Button size="lg" onClick={() => fallback.action()}>
                        {fallback.text}
                    </Button>
                </div>
            ) : null}
        </div>
    );
};
