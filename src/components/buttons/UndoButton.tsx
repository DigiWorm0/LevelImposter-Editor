import { AnchorButton, Tooltip } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useCanUndo, useUndo } from "../../hooks/map/useHistory";

export default function UndoButton() {
    const { t } = useTranslation();
    const undo = useUndo();
    const canUndo = useCanUndo();

    return (
        <Tooltip
            fill
            content={t("edit.undo") as string}
            position="bottom">

            <AnchorButton
                fill
                minimal
                disabled={!canUndo}
                icon={"undo"}
                onClick={undo}
            />
        </Tooltip>
    );
}