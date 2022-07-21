import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useRemoveElement } from "../../hooks/jotai/useElement";
import { useSelectedElemID } from "../../hooks/jotai/useSelectedElem";

export default function DeleteObjectButton() {
    const removeElement = useRemoveElement();
    const [selectedID, setSelectedID] = useSelectedElemID();

    const handleClick = () => {
        removeElement(selectedID);
        setSelectedID(undefined);
    }

    return (
        <>
            <Tooltip2
                content="Remove the object"
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="cube-remove"
                    disabled={!selectedID}
                    onClick={handleClick} />

            </Tooltip2>
        </>
    );
}