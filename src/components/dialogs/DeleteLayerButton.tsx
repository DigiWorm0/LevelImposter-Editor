import { AnchorButton, Classes, Dialog } from "@blueprintjs/core";
import React from 'react';
import { useLayerElementIDs, useSelectedLayerID, useSetLayers } from "../../hooks/jotai/useLayer";
import { useSetMap } from '../../hooks/jotai/useMap';
import { useSettingsValue } from '../../hooks/jotai/useSettings';
import useTranslation from "../../hooks/useTranslation";

export default function DeleteLayerButton(props: { isSidePanel?: boolean }) {
    const layerElementIDs = useLayerElementIDs();
    const translation = useTranslation();
    const setMap = useSetMap();
    const setLayers = useSetLayers();
    const [selectedLayerID, setSelectedLayerID] = useSelectedLayerID();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const settings = useSettingsValue();


    const deleteLayer = () => {
        setLayers((layers) => {
            const layerList = layers === undefined ? [] : layers;
            const newLayers = layerList.filter((layer) => layer.id !== selectedLayerID);
            return newLayers;
        });
        setSelectedLayerID(undefined);
    }
    const deleteLayerElements = () => {
        setMap(map => {
            map.elements = map.elements.filter(elem => elem.properties.layer !== selectedLayerID);
            return map;
        });
    }
    const demoteLayerElements = () => {
        setMap(map => {
            const elements = map.elements.map(elem => {
                if (elem.properties.layer === selectedLayerID) {
                    elem.properties.layer = undefined;
                }
                return elem;
            });
            return { ...map, elements };
        });
    }

    return (
        <>

            <AnchorButton
                fill={props.isSidePanel}
                className={Classes.MINIMAL}
                icon="cube-remove"
                disabled={selectedLayerID === undefined}
                intent={props.isSidePanel ? "danger" : undefined}
                onClick={() => layerElementIDs.length > 0 ? setIsDialogOpen(true) : deleteLayer()} />

            <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={translation.DeleteLayerDialogTitle}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div className={Classes.DIALOG_BODY}>
                    <p>{translation.DeleteLayerDialogText}</p>
                </div>

                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <AnchorButton
                            intent="danger"
                            icon="cube-remove"
                            onClick={() => {
                                deleteLayerElements();
                                deleteLayer();
                                setIsDialogOpen(false);
                            }}>
                            {translation.DeleteLayerDeleteObjects}
                        </AnchorButton>
                        <AnchorButton
                            intent="warning"
                            icon={"cube"}
                            onClick={() => {
                                demoteLayerElements();
                                deleteLayer();
                                setIsDialogOpen(false);
                            }}>
                            {translation.DeleteLayerDemoteObjects}
                        </AnchorButton>
                        <AnchorButton
                            icon={"cross"}
                            onClick={() => setIsDialogOpen(false)}>
                            {translation.Cancel}
                        </AnchorButton>
                    </div>
                </div>
            </Dialog>
        </>
    );
}