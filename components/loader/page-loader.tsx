import { Loader2Icon } from "lucide-react";
import { FC, HTMLAttributes } from "react";

interface PageLoaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const PageLoader: FC<PageLoaderProps> = ({ ...props }) => {
    return (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-6" {...props}>
            <Loader2Icon size={52} className="animate-spin text-sky-600" />
            <h2 className="text-muted-foreground">Loading...</h2>
        </div>
    );
};
