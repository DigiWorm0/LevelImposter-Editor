import { AnchorButton, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useRemoveElement, useSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";

export default function DeleteObjectButton(props: { isSidePanel?: boolean }) {
    const translation = useTranslation();
    const removeElement = useRemoveElement();
    const [selectedID, setSelectedID] = useSelectedElemID();

    const handleClick = () => {
        removeElement(selectedID);
        setSelectedID(undefined);
    }

    return (
        <>
            <Tooltip2
                content={translation.DeleteObject}
                position="bottom">

                <AnchorButton
                    className={Classes.MINIMAL}
                    icon="cube-remove"
                    disabled={!selectedID}
                    intent={props.isSidePanel ? "danger" : undefined}
                    onClick={handleClick} />

            </Tooltip2>
        </>
    );
}