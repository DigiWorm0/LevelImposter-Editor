import { Button, Tooltip } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useCopyToClipboard from "../../hooks/input/useCopyToClipboard";

export default function CopyButton() {
    const { t } = useTranslation();
    const copyElement = useCopyToClipboard();

    return (
        <Tooltip
            content={t("edit.copy") as string}
            position="bottom"
        >
            <Button
                minimal
                icon="duplicate"
                onClick={copyElement}
            />
        </Tooltip>
    );
}