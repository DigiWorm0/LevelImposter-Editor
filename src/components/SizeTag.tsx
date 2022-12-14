import { Icon, Tag } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";

export default function SizeTag(props: { sizeBytes: number, okMsg: string, warningMsg: string }) {
    const { sizeBytes, okMsg, warningMsg } = props;

    const isOverSize = sizeBytes > 1000 * 1000 * 2; // 2 MB
    const isSuperOverSize = sizeBytes > 1000 * 1000 * 5; // 5 MB
    const sizeIntent = isSuperOverSize ? "danger" : (isOverSize ? "warning" : "success");

    const sizeString = React.useMemo(() => {
        const sizeKB = sizeBytes / 1000;
        const sizeMB = sizeKB / 1000;

        if (sizeMB > 1)
            return `${sizeMB.toFixed(2)} MB`;
        else if (sizeKB > 1)
            return `${sizeKB.toFixed(2)} KB`;
        else
            return `${sizeBytes} Bytes`;
    }, [sizeBytes]);


    return (
        <Tooltip2
            content={isOverSize ? warningMsg : okMsg}
            position="top"
            intent={sizeIntent}
        >
            <Tag
                minimal
                large
                intent={sizeIntent}
            >
                {isOverSize && <Icon icon="warning-sign" style={{ marginRight: 5 }} />}
                {sizeString}
            </Tag>
        </Tooltip2>
    );
}