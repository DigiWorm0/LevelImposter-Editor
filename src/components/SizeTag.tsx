import { Icon, Tag } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SizeTag(props: { sizeBytes: number, okMsg: string, warningMsg: string }) {
    const { t } = useTranslation();
    const { sizeBytes, okMsg, warningMsg } = props;

    const isOverSize = sizeBytes > 1000 * 1000 * 2; // 2 MB
    const isSuperOverSize = sizeBytes > 1000 * 1000 * 5; // 5 MB
    const sizeIntent = isSuperOverSize ? "danger" : (isOverSize ? "warning" : "success");

    const sizeString = React.useMemo(() => {
        const sizeKB = sizeBytes / 1000;
        const sizeMB = sizeKB / 1000;

        if (sizeMB > 1)
            return t("size.megabytes", { size: sizeMB.toFixed(2) });
        else if (sizeKB > 1)
            return t("size.kilobytes", { size: sizeKB.toFixed(2) });
        else
            return t("size.bytes", { size: sizeBytes });
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