import { AnchorButton, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import useClipboard from "../../hooks/jotai/useClipboard";

export default function PasteButton() {
    const { t } = useTranslation();
    const { pasteElement, canPaste } = useClipboard();

    return (
        <>
            <Tooltip2
                content={t("edit.paste") as string}
                position="bottom">

                <AnchorButton
                    className={Classes.MINIMAL}
                    icon="clipboard"
                    onClick={pasteElement}
                    disabled={!canPaste}
                />

            </Tooltip2>
        </>
    );
}