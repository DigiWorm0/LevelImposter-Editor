import React from "react";
import {Button, Card, CardContent, Collapse, Typography} from "@mui/material";
import AnimatedCaretIcon from "../../utils/AnimatedCaretIcon";
import ErrorBoundary from "../../utils/ErrorBoundary";

interface PanelContainerProps {
    children?: React.ReactNode;
    title?: string;
    style?: React.CSSProperties;
}

export default function PanelContainer(props: PanelContainerProps) {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
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
                endIcon={<AnimatedCaretIcon up={!isOpen}/>}
                size={"large"}
                onClick={() => setIsOpen(!isOpen)}
                style={{fontWeight: 600}}
            >
                {props.title}
            </Button>
            <Collapse in={isOpen}>
                <CardContent sx={{paddingTop: 0}} style={{paddingBottom: 10}}>
                    <ErrorBoundary fallback={
                        <Typography
                            variant={"body2"}
                            color={"textSecondary"}
                            sx={{textAlign: "center"}}
                        >
                            Error loading object, <br/>
                            see console for more details
                        </Typography>
                    }
                    >
                        {props.children}
                    </ErrorBoundary>
                </CardContent>
            </Collapse>
        </Card>
    );
}
