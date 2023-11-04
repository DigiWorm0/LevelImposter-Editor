import { Button, Card, Collapse } from "@blueprintjs/core";
import React from "react";

interface PanelContainerProps {
    children: React.ReactNode;
    title?: string;
    style?: React.CSSProperties;
    isOpen?: boolean;
}

export default function PanelContainer(props: PanelContainerProps) {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <Collapse isOpen={props.isOpen ?? true}>
            <Card
                style={{
                    padding: 0,
                    marginTop: 10,
                    boxShadow: "none",
                    borderRadius: 0
                }}
            >
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
                    keepChildrenMounted={true}
                >
                    <div
                        style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingBottom: 10,
                            ...props.style
                        }}
                    >
                        {props.children}
                    </div>
                </Collapse>
            </Card>
        </Collapse>
    );
}
