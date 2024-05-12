import { AnchorButton, Tooltip } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useCanRedo, useRedo } from "../../hooks/map/useHistory";

export default function RedoButton() {
    const { t } = useTranslation();
    const redo = useRedo();
    const canRedo = useCanRedo();

    return (
        <Tooltip
            fill
            content={t("edit.redo") as string}
            position="bottom"
        >
            <AnchorButton
                fill
                minimal
                disabled={!canRedo}
                icon={"redo"}
                onClick={redo}
            />
        </Tooltip>
    );
}