import React from "react";

export interface InputGroupProps {
    children: React.ReactNode;
}

export default function InputGroup(props: InputGroupProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            {props.children}
        </div>
    )
}
