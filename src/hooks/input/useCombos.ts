import React from "react";
import useComboHandles from "../useComboHandles";

export default function useCombos() {
    const [isControlDown, setControl] = React.useState(false);
    const [onDelete, onCopy, onPaste, onCut] = useComboHandles();

    React.useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        }
    }, [isControlDown, onDelete, onCopy, onPaste, onCut]);

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Delete") {
            onDelete();
        }
        else if (e.key === "Control") {
            setControl(true);
        }
        else if (isControlDown) {
            switch (e.key) {
                case "c":
                    onCopy();
                    break;
                case "v":
                    onPaste();
                    break;
                case "x":
                    onCut();
                    break;
            }
        }
    }

    const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Control") {
            setControl(false);
        }
    }
}