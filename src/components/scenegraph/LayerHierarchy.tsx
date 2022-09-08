import { InputGroup, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import React from 'react';
import { useLayers, useSelectedLayerID } from "../../hooks/jotai/useLayer";
import useTranslation from '../../hooks/useTranslation';
import LayerButtons from "../dialogs/LayerButtons";

export default function LayerHierarchy() {
    const [isEditing, setIsEditing] = React.useState(false);
    const [layers, setLayers] = useLayers();
    const [selectedLayerID, setSelectedLayerID] = useSelectedLayerID();
    const translation = useTranslation();

    return (
        <Menu>
            <h3 style={{ textAlign: "center" }}>{translation.Layers}</h3>

            <MenuItem2
                disabled={isEditing}
                text={translation.AllElements}
                active={selectedLayerID === undefined}
                style={{ outline: 0 }}
                intent={"warning"}
                icon={selectedLayerID === undefined ? "layer" : "layer-outline"}
                onClick={() => setSelectedLayerID(undefined)}

            />

            {layers?.map((layer) => {
                if (selectedLayerID == layer.id && isEditing) {
                    return (
                        <MenuItem2
                            key={layer.id}
                            text={
                                <InputGroup
                                    intent="danger"
                                    small
                                    autoFocus
                                    value={layer.name}
                                    maxLength={20}
                                    onChange={(e) => {
                                        setLayers((layers) => {
                                            if (layers) {
                                                const newLayers = [...layers];
                                                const index = newLayers.findIndex((l) => l.id === layer.id);
                                                newLayers[index] = { ...layer, name: e.target.value };
                                                return [...newLayers];
                                            }
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
                            intent={"danger"}
                            active={selectedLayerID === layer.id}
                        />
                    );
                }
                return (
                    <MenuItem2
                        disabled={isEditing}
                        style={{ outline: 0 }}
                        icon={selectedLayerID === layer.id ? "layer" : "layer-outline"}
                        key={layer.id}
                        text={layer.name}
                        active={layer.id === selectedLayerID}
                        onClick={() => setSelectedLayerID(layer.id)}
                        intent={"primary"} />
                );
            })}

            <LayerButtons
                isEditing={isEditing}
                setIsEditing={setIsEditing} />
        </Menu>
    );
}