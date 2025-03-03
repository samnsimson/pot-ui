"use client";

import { Button } from "@/components/ui/button";
import { RepeatIcon } from "lucide-react";

interface ErrorProp {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProp) {
    return (
        <div className="flex flex-col flex-1  h-full gap-4 w-full text-center items-center justify-center">
            <h2>{error.message || "Something went wrong!"}</h2>
            <Button
                variant="secondary"
                className="rounded-none p-3 min-h-12 flex gap-3 items-center justify-center border border-gray-300 max-w-lg"
                onClick={() => reset()}
            >
                <RepeatIcon /> <span>Try again</span>
            </Button>
        </div>
    );
}
