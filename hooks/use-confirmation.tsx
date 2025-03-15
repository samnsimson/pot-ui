"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal-context";
import { CheckIcon, XIcon } from "lucide-react";
import { useCallback } from "react";

interface ConfirmationProps {
    onConfirm: () => void;
    onCancel?: () => void;
    title?: string;
    description?: string;
    confirmText: string;
    cancelText: string;
}

const confirmationComponent = ({ onConfirm, onCancel, cancelText, confirmText }: ConfirmationProps) => (
    <div className="flex w-full gap-3">
        <Button className="w-full space-x-2 rounded-md" variant="secondary" onClick={onCancel}>
            <XIcon />
            <span>{cancelText}</span>
        </Button>
        <Button className="w-full space-x-2 rounded-md" variant="destructive" onClick={onConfirm}>
            <CheckIcon />
            <span>{confirmText}</span>
        </Button>
    </div>
);

export const useConfirmation = ({ title, description, confirmText, cancelText, onConfirm, onCancel }: ConfirmationProps) => {
    const { openModal, closeModal } = useModal({ size: "xl" });

    const cancel = useCallback(() => {
        closeModal();
        if (onCancel) onCancel();
    }, [closeModal, onCancel]);

    const confirm = useCallback(() => {
        openModal({
            title: title || "Confirm delete",
            description: description || "Are you sure you want to continue?",
            render: () => confirmationComponent({ onConfirm, onCancel: cancel, confirmText, cancelText }),
        });
    }, [cancelText, confirmText, description, cancel, onConfirm, openModal, title]);

    return { confirm };
};
