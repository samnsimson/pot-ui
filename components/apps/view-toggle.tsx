"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

interface ViewToggleProps {
    onChange: (mode: ViewMode) => void;
    defaultMode?: ViewMode;
}

export function ViewToggle({ onChange, defaultMode = "grid" }: ViewToggleProps) {
    const [mode, setMode] = useState<ViewMode>(defaultMode);

    useEffect(() => {
        const savedMode = localStorage.getItem("viewMode") as ViewMode | null;
        if (savedMode) setMode(savedMode);
    }, []);

    const handleModeChange = (newMode: ViewMode) => {
        setMode(newMode);
        onChange(newMode);
        localStorage.setItem("viewMode", newMode);
    };

    return (
        <div className="flex items-center divide-x border border-border">
            <Button variant={mode === "grid" ? "secondary" : "ghost"} size="sm" onClick={() => handleModeChange("grid")} aria-label="Grid view">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Grid
            </Button>
            <Button variant={mode === "list" ? "secondary" : "ghost"} size="sm" onClick={() => handleModeChange("list")} aria-label="List view">
                <List className="mr-2 h-4 w-4" />
                List
            </Button>
        </div>
    );
}
