import { Button, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useLayers, useSelectedLayerID } from "../../hooks/jotai/useLayer";
import { MaybeGUID } from "../../types/generic/GUID";
import AddLayerButton from "../dialogs/AddLayerButton";

export default function LayerHierarchy() {
    const [layers, setLayers] = useLayers();
    const [selectedLayerID, setSelectedLayerID] = useSelectedLayerID();
    const saveHistory = useSaveHistory();

    const deleteLayer = (layerID: MaybeGUID) => {
        saveHistory();
        if (selectedLayerID === layerID) {
            setSelectedLayerID(undefined);
        }
        setLayers((layers) => {
            const layerList = layers === undefined ? [] : layers;
            return layerList.filter((layer) => layer.id !== layerID);
        });
    }

    const selectLayer = (layerID: MaybeGUID) => {
        setSelectedLayerID(selectedLayerID != layerID ? layerID : undefined);
    }

    return (
        <Menu>
            <h3 style={{ textAlign: "center" }}>Layers</h3>
            {layers?.map((layer) => (
                <MenuItem2
                    style={{ outline: 0 }}
                    roleStructure="listoption"
                    key={layer.id}
                    text={layer.name}
                    active={layer.id === selectedLayerID}
                    onClick={() => selectLayer(layer.id)}
                    intent={layer.id === selectedLayerID ? "primary" : "none"}
                    labelElement={
                        layer.id === selectedLayerID ? (
                            <Button
                                icon={"trash"}
                                minimal={true}
                                small
                                onClick={() => deleteLayer(layer.id)}
                                intent={"primary"}
                            />
                        ) : undefined
                    } />
            ))}
            <AddLayerButton />
        </Menu>
    );
}