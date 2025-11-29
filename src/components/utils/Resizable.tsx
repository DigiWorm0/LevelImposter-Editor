import React from "react";
import usePanelSize from "../../hooks/ui/usePanelSize";

export interface ResizableProps {

    /// A unique key to save the size in local storage.
    storageKey: string;

    defaultSize: number;
    minSize?: number;
    maxSize?: number;

    barLocation?: "top" | "bottom" | "left" | "right";
    onResize?: (newSize: number) => void;
    children: React.ReactNode;
}

export default function Resizable(props: ResizableProps) {
    const [isHoveringHandle, setIsHoveringHandle] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [size, setSize] = usePanelSize(props.storageKey);
    const handleRef = React.useRef<HTMLDivElement>(null);
    const startPosRef = React.useRef<number>(0);
    const startSizeRef = React.useRef<number>(props.defaultSize);

    const axis = props.barLocation === "left" || props.barLocation === "right" ? "x" : "y";

    const onHandleMouseDown = (e: MouseEvent) => {
        e.preventDefault();

        startPosRef.current = axis === "y" ? e.clientY : e.clientX;
        startSizeRef.current = size ?? props.defaultSize;

        setIsDragging(true);
    };

    const onHandleMouseUp = () => {
        startPosRef.current = 0;

        setIsDragging(false);
    };

    const onHandleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        e.preventDefault();

        const mousePos = axis === "y" ? e.clientY : e.clientX;
        const delta = mousePos - startPosRef.current;

        let newSize = startSizeRef.current;
        if (props.barLocation === "bottom" || props.barLocation === "right") {
            newSize += delta;
        } else {
            newSize -= delta;
        }

        if (props.minSize !== undefined) {
            newSize = Math.max(newSize, props.minSize);
        }

        if (props.maxSize !== undefined) {
            newSize = Math.min(newSize, props.maxSize);
        }

        setSize(newSize);
        props.onResize?.(newSize);

    };

    React.useEffect(() => {
        window.addEventListener("mousemove", onHandleMouseMove);
        window.addEventListener("mouseup", onHandleMouseUp);

        return () => {
            window.removeEventListener("mousemove", onHandleMouseMove);
            window.removeEventListener("mouseup", onHandleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            style={{
                width: axis === "x" ? size : "100%",
                height: axis === "y" ? size : "100%",
                position: "relative",

                display: "flex",
                flexDirection: axis === "x" ? "row" : "column",
                overflow: "hidden",
            }}
        >
            {/* Resize handle */}
            <div
                ref={handleRef}
                style={{
                    cursor: axis === "y" ? "row-resize" : "col-resize",
                    width: axis === "x" ? 5 : "100%",
                    height: axis === "y" ? 5 : "100%",

                    position: "absolute",
                    top: props.barLocation === "bottom" ? undefined : 0,
                    bottom: props.barLocation === "bottom" ? 0 : undefined,
                    left: props.barLocation === "right" ? undefined : 0,
                    right: props.barLocation === "right" ? 0 : undefined,

                    display: "flex",
                    zIndex: 10000,
                    
                    pointerEvents: "auto",
                }}
                onMouseEnter={() => setIsHoveringHandle(true)}
                onMouseLeave={() => setIsHoveringHandle(false)}
                onMouseDown={(e) => {
                    e.preventDefault();
                    onHandleMouseDown(e.nativeEvent);
                }}
            >
                <div
                    style={{
                        backgroundColor: "#90caf9",
                        opacity: isDragging ? 0.5 :
                            isHoveringHandle ? 0.2 :
                                0,
                        transition: "opacity 0.1s",
                        width: axis === "x" ? "5px" : "100%",
                        height: axis === "y" ? "5px" : "100%",
                        transform: axis === "x" ? "translateX(-50%)" : "translateY(-50%)",
                    }}
                />
            </div>

            {props.children}
        </div>
    );
}