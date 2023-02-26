import { AnchorButton, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useRemoveElement, useSelectedElemID } from "../../hooks/jotai/useSelectedElem";

export default function DeleteObjectButton(props: { isSidePanel?: boolean }) {
    const { t } = useTranslation();
    const removeElement = useRemoveElement();
    const [selectedID, setSelectedID] = useSelectedElemID();

    const handleClick = () => {
        removeElement(selectedID);
        setSelectedID(undefined);
    }

    return (
        <>
            <Tooltip2
                fill
                content={t("object.delete") as string}
                position="bottom">

                <AnchorButton
                    fill
                    className={Classes.MINIMAL}
                    icon={"trash"}
                    disabled={!selectedID}
                    intent={props.isSidePanel ? "danger" : undefined}
                    onClick={handleClick} />

            </Tooltip2>
        </>
    );
}