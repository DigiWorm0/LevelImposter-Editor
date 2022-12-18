import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useUndo } from "../../hooks/jotai/useHistory";

export default function UndoButton() {
    const { t } = useTranslation();
    const undo = useUndo();

    return (
        <>
            <Tooltip2
                fill
                content={t("edit.undo") as string}
                position="bottom">

                <Button
                    fill
                    className={Classes.MINIMAL}
                    icon={"undo"}
                    onClick={undo} />

            </Tooltip2>
        </>
    );
}