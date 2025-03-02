"use client";
import { CheckIcon, XIcon } from "lucide-react";
import { useToast } from "./use-toast";

interface FeedbackProps {
    title: string;
    description: string;
}

export const useFeedback = () => {
    const { toast } = useToast();

    const feedbackSuccess = ({ title, description }: FeedbackProps) => {
        toast({ title, description, variant: "success", action: <CheckIcon /> });
    };

    const feedbackFailure = ({ title, description }: FeedbackProps) => {
        toast({ title, description, variant: "destructive", action: <XIcon /> });
    };

    return { feedbackSuccess, feedbackFailure };
};
