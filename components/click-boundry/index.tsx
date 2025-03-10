"use client";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";

interface ClickBoundryProps extends HTMLAttributes<HTMLDivElement> {
    onStateChange: (state: boolean) => void;
}

export const ClickBoundry: FC<ClickBoundryProps> = ({ children, onStateChange }) => {
    const [active, setActive] = useState<boolean>(false);
    const wrapperRef = useRef<any>(null);

    const handleClickInside = () => setActive(true);
    const handleClickOutside = (event: MouseEvent) => wrapperRef.current && !wrapperRef.current.contains(event.target) && setActive(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => onStateChange(active), [active, onStateChange]);

    return (
        <div ref={wrapperRef} onClick={handleClickInside}>
            {children}
        </div>
    );
};
