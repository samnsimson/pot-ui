import { FC, HTMLAttributes } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorCardProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ErrorCard: FC<ErrorCardProps> = ({ ...props }) => {
    return (
        <Card className="p-8 text-center">
            <p className="mb-4 text-destructive">Failed to load apps</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
        </Card>
    );
};
