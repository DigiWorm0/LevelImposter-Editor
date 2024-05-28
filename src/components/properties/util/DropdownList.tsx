import { Button, Collapse, Divider } from "@mui/material";
import { ExpandLess } from "@mui/icons-material";
import React from "react";

export interface DropdownElement<T> {
    id: T;
    name: string;
    icon?: React.ReactNode;
    intent?: "primary" | "secondary" | "success" | "warning" | "error" | "inherit";
    isDisabled?: boolean;
}

export interface DropdownListProps<T> {
    elements: DropdownElement<T>[];
    onSelectID: (id?: T) => void;

    selectedID?: T;
    children?: React.ReactNode;
    renderElement?: (element: DropdownElement<T>) => React.ReactNode;
}

export default function DropdownList<T>(props: DropdownListProps<T>) {
    return (<>
        <Divider sx={{ width: "100%" }} />

        {props.elements?.map((element) => (
            <div key={element.id as string}>
                <Button
                    fullWidth
                    variant={props.selectedID === element.id ? "contained" : "text"}
                    size={"small"}
                    color={element.intent ?? "primary"}
                    onClick={() => props.onSelectID(element.id == props.selectedID ? undefined : element.id)}
                    disabled={element.isDisabled}
                    style={{ margin: 1 }}
                    endIcon={
                        <ExpandLess
                            style={{
                                transform: props.selectedID === element.id ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease-in-out"
                            }}
                        />
                    }
                >
                    {element.name}
                </Button>

                <Collapse in={props.selectedID === element.id && !element.isDisabled}>
                    {props.children}
                    {props.renderElement && props.renderElement(element)}
                </Collapse>

                <Divider sx={{ width: "100%" }} />
            </div>
        ))}
    </>);
}