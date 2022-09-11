import { AnchorButton, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import generateGUID from "../../hooks/generateGUID";
import { useAddElement } from "../../hooks/jotai/useElements";
import { useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";

export default function AddLayerButton(props: { isSidePanel?: boolean }) {
    const translation = useTranslation();
    const setSelectedID = useSetSelectedElemID();
    const addElement = useAddElement();

    const handleClick = () => {
        const id = generateGUID();
        addElement({
            id,
            name: "New Layer",
            type: "util-layer",
            x: 0,
            y: 0,
            z: 0,
            xScale: 1,
            yScale: 1,
            rotation: 0,
            properties: {}
        });
        setSelectedID(id);
    }

    return (
        <>
            <Tooltip2
                fill
                content={translation.AddLayer}
                position="bottom">

                <AnchorButton
                    fill
                    className={Classes.MINIMAL}
                    icon="folder-new"
                    intent={props.isSidePanel ? "primary" : undefined}
                    onClick={handleClick} />

            </Tooltip2>
        </>
    );
}