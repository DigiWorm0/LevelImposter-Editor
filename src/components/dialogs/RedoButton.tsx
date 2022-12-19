import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useRedo } from "../../hooks/jotai/useHistory";

export default function RedoButton() {
    const { t } = useTranslation();
    const redo = useRedo();

    return (
        <>
            <Tooltip2
                fill
                content={t("edit.redo") as string}
                position="bottom">

                <Button
                    fill
                    className={Classes.MINIMAL}
                    icon={"redo"}
                    onClick={redo} />

            </Tooltip2>
        </>
    );
}