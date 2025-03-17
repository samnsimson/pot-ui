"use client";

import type { FC } from "react";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyAppsProps {
    onCreateApp: () => void;
}

export const EmptyApps: FC<EmptyAppsProps> = ({ onCreateApp }) => {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-12">
            <div className="mb-4 rounded-full bg-primary/10 p-6">
                <FolderPlus size={48} className="text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">No apps found</h3>
            <p className="mb-6 max-w-md text-center text-muted-foreground">
                You haven&apos;t created any apps yet. Create your first app to start managing content.
            </p>
            <Button onClick={onCreateApp} className="gap-2">
                <FolderPlus className="h-4 w-4" />
                Create Your First App
            </Button>
        </div>
    );
};
