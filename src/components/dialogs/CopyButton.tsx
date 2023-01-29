import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import useClipboard from "../../hooks/jotai/useClipboard";

export default function CopyButton() {
    const { t } = useTranslation();
    const { copyElement, canCopy } = useClipboard();

    return (
        <>
            <Tooltip2
                content={t("edit.copy") as string}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="duplicate"
                    onClick={copyElement}
                    disabled={!canCopy}
                />

            </Tooltip2>
        </>
    );
}