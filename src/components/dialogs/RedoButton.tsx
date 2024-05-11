import { AnchorButton, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useCanRedo, useRedo } from "../../hooks/map/useHistory";

export default function RedoButton() {
    const { t } = useTranslation();
    const redo = useRedo();
    const canRedo = useCanRedo();

    return (
        <>
            <Tooltip2
                fill
                content={t("edit.redo") as string}
                position="bottom">

                <AnchorButton
                    disabled={!canRedo}
                    fill
                    className={Classes.MINIMAL}
                    icon={"redo"}
                    onClick={redo} />

            </Tooltip2>
        </>
    );
}