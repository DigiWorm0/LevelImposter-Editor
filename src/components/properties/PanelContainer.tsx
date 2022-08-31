import { Button, Collapse, Divider } from "@blueprintjs/core";
import React from "react";

interface PanelContainerProps {
    children: React.ReactNode;
    title?: string;
}

export default function PanelContainer(props: PanelContainerProps) {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div className="panel-container">
            <Button
                fill
                minimal
                large
                rightIcon={isOpen ? "chevron-up" : "chevron-down"}
                onClick={() => setIsOpen(!isOpen)}
                text={props.title}
                alignText="left"
                style={{ marginTop: 5, marginBottom: 5, fontWeight: 600 }}
            />
            <Collapse
                isOpen={isOpen}
                keepChildrenMounted={true}>

                {props.children}
            </Collapse>

            <Divider style={{ marginTop: 10 }} />
        </div>
    );
}
