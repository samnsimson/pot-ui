"use client";

import { Button } from "@/components/ui/button";
import { RepeatIcon } from "lucide-react";

interface ErrorProp {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProp) {
    return (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4 text-center">
            <h2>{error.message || "Something went wrong!"}</h2>
            <Button
                variant="secondary"
                className="flex min-h-12 max-w-lg items-center justify-center gap-3 rounded-none border border-gray-300 p-3"
                onClick={() => reset()}
            >
                <RepeatIcon /> <span>Try again</span>
            </Button>
        </div>
    );
}
