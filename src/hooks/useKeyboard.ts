import React from "react";

export default function useKeyboard() {
    const [keys, setKeys] = React.useState([] as string[]);

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (keys.indexOf(event.key) === -1) {
                setKeys([...keys, event.key]);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            setKeys(keys.filter(key => key !== event.key));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }, []);

    return keys;
}