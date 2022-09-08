import { Button, ButtonGroup } from "@blueprintjs/core";
import generateGUID from '../../hooks/generateGUID';
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useSelectedLayerID, useSetLayers, useSetSelectedLayerID } from "../../hooks/jotai/useLayer";
import useTranslation from "../../hooks/useTranslation";
import DeleteLayerButton from './DeleteLayerButton';

export default function LayerButtons(props: { isEditing: boolean, setIsEditing: (isEditing: boolean) => void }) {
    const translation = useTranslation();
    const [selectedLayerID, setSelectedLayerID] = useSelectedLayerID();
    const setLayers = useSetLayers();
    const setSelectedID = useSetSelectedLayerID();
    const saveHistory = useSaveHistory();

    const addLayer = () => {
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

    const editLayer = () => {
        props.setIsEditing(!props.isEditing);
    }


    return (
        <ButtonGroup fill style={{ padding: 5 }} minimal>
            <Button
                fill
                icon={"new-layers"}
                intent={"success"}
                onClick={addLayer} />

            <Button
                fill
                icon={"edit"}
                disabled={selectedLayerID === undefined || props.isEditing}
                intent={"primary"}
                onClick={editLayer} />

            <DeleteLayerButton
                isSidePanel={true} />

        </ButtonGroup>
    );
}