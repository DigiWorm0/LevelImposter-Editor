import { Button, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useUndo } from "../../hooks/jotai/useHistory";

export default function UndoButton() {
    const undo = useUndo();

    return (
        <>
            <Tooltip2
                fill
                content="Undo"
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