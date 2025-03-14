import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center min-h-12 justify-center gap-2 whitespace-nowrap rounded-none text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                success: "bg-success text-primary-foreground hover:bg-success/90",
                primary: "bg-primary-dark text-primary-dark-foreground hover:bg-primary-dark/90",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                muted: "hover:bg-muted hover:text-muted-foreground",
                link: "text-primary hover:text-success",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={isLoading} {...props}>
            {isLoading ? <LoaderIcon className="animate-spin" /> : children}
        </Comp>
    );
});
Button.displayName = "Button";

export { Button, buttonVariants };
