import { AnchorButton, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useCanUndo, useUndo } from "../../hooks/map/useHistory";

export default function UndoButton() {
    const { t } = useTranslation();
    const undo = useUndo();
    const canUndo = useCanUndo();

    return (
        <>
            <Tooltip2
                fill
                content={t("edit.undo") as string}
                position="bottom">

                <AnchorButton
                    disabled={!canUndo}
                    fill
                    className={Classes.MINIMAL}
                    icon={"undo"}
                    onClick={undo} />

            </Tooltip2>
        </>
    );
}