import { FC, HTMLAttributes } from "react";

interface PageLoaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const PageLoader: FC<PageLoaderProps> = ({ ...props }) => {
    return (
        <div className="h-full w-full flex items-center justify-center" {...props}>
            PageLoader
        </div>
    );
};
