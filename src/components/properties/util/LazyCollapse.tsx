import { Collapse, CollapseProps } from "@mui/material";
import React from "react";

const MOUNT_TIMEOUT = 300;

export default function LazyCollapse(props: CollapseProps) {
    const [isMounted, setIsMounted] = React.useState(false);

    // Unmount the component after the collapse animation is done
    React.useEffect(() => {
        if (props.in)
            setIsMounted(true);
    }, [props.in]);

    return (
        <Collapse {...props}>
            {/* Render children only when the Collapse is open */}
            {props.in || isMounted ? props.children : null}
        </Collapse>
    )
}