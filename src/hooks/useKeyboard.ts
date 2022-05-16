import React from "react";

export default function useKeyboard() {
    const [keys, setKeys] = React.useState({} as Record<string, boolean>);

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setKeys({
                ...keys,
                [event.key]: true,
            });
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            setKeys({
                ...keys,
                [event.key]: false,
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }, []);

    return keys;
}