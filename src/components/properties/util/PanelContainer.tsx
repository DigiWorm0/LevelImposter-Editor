import React from "react";
import { Button, Card, CardContent, Collapse } from "@mui/material";
import { ExpandLess } from "@mui/icons-material";

interface PanelContainerProps {
    children: React.ReactNode;
    title?: string;
    style?: React.CSSProperties;
    isOpen?: boolean;
}

export default function PanelContainer(props: PanelContainerProps) {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <Collapse in={props.isOpen ?? true}>
            <Card
                elevation={3}
                sx={{
                    padding: 0,
                    marginTop: 1,
                    boxShadow: "none",
                    borderRadius: 0
                }}
            >
                <Button
                    fullWidth
                    endIcon={
                        <ExpandLess
                            style={{
                                transform: isOpen ? "rotate(180deg)" : "",
                                transition: "transform 0.2s"
                            }}
                        />
                    }
                    size={"large"}
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ fontWeight: 600 }}
                >
                    {props.title}
                </Button>
                <Collapse in={isOpen}>
                    <CardContent sx={{ paddingTop: 0 }} style={{ paddingBottom: 10 }}>
                        {props.children}
                    </CardContent>
                </Collapse>
            </Card>
        </Collapse>
    );
}
