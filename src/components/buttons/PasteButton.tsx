import { Button, Tooltip } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import usePasteFromClipboard from "../../hooks/input/usePasteFromClipboard";

export default function PasteButton() {
    const { t } = useTranslation();
    const pasteElement = usePasteFromClipboard();

    return (
        <Tooltip
            content={t("edit.paste") as string}
            position="bottom"
        >
            <Button
                minimal
                icon="clipboard"
                onClick={pasteElement}
            />
        </Tooltip>
    );
}