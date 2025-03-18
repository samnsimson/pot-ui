import { ContentData } from "@/components/content/content-data";
import { NextPage } from "next";
import { PropsWithChildren } from "react";

const ContentPage: NextPage<PropsWithChildren> = ({}) => {
    return (
        <div className="h-full flex-1">
            <ContentData />
        </div>
    );
};
export default ContentPage;
