import React from "react";
import useKeyboard from "./useKeyboard";

export default function useKey(key: string, onUpdate: () => void) {
    const [isKeyDown, setIsKeyDown] = React.useState(false);
    const [interval, setInterval] = React.useState<number | null>(null);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === key) {
                setIsKeyDown(true);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === key) {
                setIsKeyDown(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    React.useEffect(() => {
        if (isKeyDown) {
            const intervalId = window.setInterval(onUpdate, 10);
            setInterval(intervalId);
        } else if (interval !== null) {
            window.clearInterval(interval);
            setInterval(null);
        }
    }, [isKeyDown]);

    return isKeyDown;
}