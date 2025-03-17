import { FileWarningIcon } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";

interface NoContentDataProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const NoContentData: FC<NoContentDataProps> = ({ ...props }) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-6" {...props}>
            <FileWarningIcon size={42} className="text-gray-300" />
            <h2 className="font-bold">Nothing to view here!</h2>
            <Button></Button>
        </div>
    );
};
