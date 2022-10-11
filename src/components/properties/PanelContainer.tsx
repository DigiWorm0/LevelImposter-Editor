import { Button, Card, Collapse, Divider } from "@blueprintjs/core";
import React from "react";

interface PanelContainerProps {
    children: React.ReactNode;
    title?: string;
}

export default function PanelContainer(props: PanelContainerProps) {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <Card style={{
            padding: 0,
            marginTop: 10,
            boxShadow: "none",
            borderRadius: 0
        }}>
            <Button
                fill
                large
                minimal
                rightIcon={isOpen ? "chevron-up" : "chevron-down"}
                onClick={() => setIsOpen(!isOpen)}
                text={props.title}
                alignText="left"
                style={{ fontWeight: 600 }}
            />
            <Collapse
                isOpen={isOpen}
                keepChildrenMounted={true}>

                <div style={{ padding: 10 }}>
                    {props.children}
                </div>
            </Collapse>
        </Card>
    );
}
