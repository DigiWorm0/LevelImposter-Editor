import { InputGroup, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import React from 'react';
import { useLayers, useSelectedLayerID } from "../../hooks/jotai/useLayer";
import useTranslation from '../../hooks/useTranslation';
import { MaybeGUID } from "../../types/generic/GUID";
import LayerButtons from "../dialogs/LayerButtons";

export default function LayerHierarchy() {
    const [isEditing, setIsEditing] = React.useState(false);
    const [layers, setLayers] = useLayers();
    const [selectedLayerID, setSelectedLayerID] = useSelectedLayerID();
    const translation = useTranslation();

    const selectLayer = (layerID: MaybeGUID) => {
        setSelectedLayerID(selectedLayerID != layerID ? layerID : undefined);
    }

    return (
        <Menu>
            <h3 style={{ textAlign: "center" }}>{translation.Layers}</h3>
            {layers?.map((layer) => {
                if (selectedLayerID == layer.id && isEditing) {
                    return (
                        <MenuItem2
                            key={layer.id}
                            text={
                                <InputGroup
                                    small
                                    autoFocus
                                    value={layer.name}
                                    maxLength={20}
                                    onChange={(e) => {
                                        setLayers((layers) => {
                                            const layerList = layers === undefined ? [] : layers;
                                            return layerList.map((layer) => {
                                                if (layer.id === selectedLayerID) {
                                                    return {
                                                        ...layer,
                                                        name: e.target.value
                                                    }
                                                }
                                                return layer;
                                            });
                                        });
                                    }}
                                    onBlur={() => setIsEditing(false)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setIsEditing(false);
                                        }
                                    }}
                                />
                            }
                            icon={"edit"}
                            intent={"primary"}
                            active={selectedLayerID === layer.id}
                        />
                    );
                }
                return (
                    <MenuItem2
                        disabled={isEditing}
                        style={{ outline: 0 }}
                        roleStructure="listoption"
                        icon={"layers"}
                        key={layer.id}
                        text={layer.name}
                        active={layer.id === selectedLayerID}
                        onClick={() => selectLayer(layer.id)}
                        intent={layer.id === selectedLayerID ? "primary" : "none"} />
                );
            })}

            <LayerButtons
                isEditing={isEditing}
                setIsEditing={setIsEditing} />
        </Menu>
    );
}