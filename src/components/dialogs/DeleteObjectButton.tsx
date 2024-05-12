import { AnchorButton, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useSelectedElemIDValue } from "../../hooks/map/elements/useSelectedElem";
import { useRemoveSelectedElement } from "../../hooks/map/elements/useRemoveElement";

export default function DeleteObjectButton(props: { isSidePanel?: boolean }) {
    const { t } = useTranslation();
    const removeSelectedElement = useRemoveSelectedElement();
    const selectedID = useSelectedElemIDValue();

    return (
        <Tooltip2
            fill
            content={t("object.delete") as string}
            position="bottom"
        >
            <AnchorButton
                fill
                className={Classes.MINIMAL}
                icon={"trash"}
                disabled={!selectedID}
                intent={props.isSidePanel ? "danger" : undefined}
                onClick={removeSelectedElement}
            />
        </Tooltip2>
    );
}