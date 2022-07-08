import React from "react";

export default function useMouse(): [boolean, boolean, boolean, (e: MouseEvent) => void, (e: MouseEvent) => void] {
    const [isLeft, setIsLeft] = React.useState(false);
    const [isMiddle, setIsMiddle] = React.useState(false);
    const [isRight, setIsRight] = React.useState(false);

    const onMouseDown = (e: MouseEvent) => {
        if (e.button === 0)
            setIsLeft(true);
        if (e.button === 1)
            setIsMiddle(true);
        if (e.button === 2)
            setIsRight(true);
    };
    const onMouseUp = (e: MouseEvent) => {
        if (e.button === 0)
            setIsLeft(false);
        if (e.button === 1)
            setIsMiddle(false);
        if (e.button === 2)
            setIsRight(false);
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }, []);

    return [isLeft, isMiddle, isRight, onMouseDown, onMouseUp];
}