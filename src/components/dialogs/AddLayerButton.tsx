import { AnchorButton, Classes } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import generateGUID from "../../utils/generateGUID";
import { useAddElement } from "../../hooks/map/elements/useElements";
import { useSetSelectedElemID } from "../../hooks/map/elements/useSelectedElem";
import { useTranslation } from "react-i18next";

export default function AddLayerButton(props: { isSidePanel?: boolean }) {
    const { t } = useTranslation();
    const setSelectedID = useSetSelectedElemID();
    const addElement = useAddElement();

    const handleClick = () => {
        const id = generateGUID();
        addElement({
            id,
            name: t("layer.new"),
            type: "util-layer",
            x: 0,
            y: 0,
            z: Number.MAX_SAFE_INTEGER,
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
                content={t("layer.add") as string}
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