import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { removeElement } from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";

export default function DeleteObjectButton() {
    const [selectedID, setSelectedID] = useSelected();

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