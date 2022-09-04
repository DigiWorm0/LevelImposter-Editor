import { Button, Classes } from "@blueprintjs/core";
import generateGUID from '../../hooks/generateGUID';
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useSetLayers, useSetSelectedLayerID } from "../../hooks/jotai/useLayer";
import useTranslation from "../../hooks/useTranslation";

export default function AddLayerButton() {
    const translation = useTranslation();
    const setLayers = useSetLayers();
    const setSelectedID = useSetSelectedLayerID();
    const saveHistory = useSaveHistory();

    const handleClick = () => {
        const id = generateGUID();
        saveHistory();
        setLayers((layers) => {
            const layerList = layers === undefined ? [] : layers;
            const newLayer = {
                name: `Layer ${layerList.length + 1}`,
                id
            };
            return [...layerList, newLayer];
        });
        setSelectedID(id);
    }

    return (
        <>
            <Button
                fill
                className={Classes.MINIMAL}
                icon={"plus"}
                text={translation.AddLayer}
                onClick={handleClick} />
        </>
    );
}