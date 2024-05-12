import { Dialog, Menu, MenuItem } from "@blueprintjs/core";
import { useSettingsValue } from "../../hooks/useSettings";
import { useMapValue } from "../../hooks/map/useMap";
import GUID from "../../types/generic/GUID";
import React from "react";

interface MapAssetsDialogProps {
    isOpen: boolean,
    onClose: () => void
}

export default function MapAssetsModal(props: MapAssetsDialogProps) {
    const { isDarkMode } = useSettingsValue();
    const map = useMapValue();

    const assetIDCounts = React.useMemo(() => {
        const { elements } = map;
        const spriteIDs = elements.map((e) => e.properties.spriteID);
        const minigameIDs = elements.map((e) => e.properties.minigames?.map((m) => m.spriteID)).flat();
        const soundIDs = elements.map((e) => e.properties.sounds?.map((s) => s.dataID)).flat();
        const allAssetIDs = [...spriteIDs, ...minigameIDs, ...soundIDs];

        const counts = new Map<GUID, number>();
        map.assets?.forEach((asset) => {
            counts.set(asset.id, allAssetIDs.filter((id) => id === asset.id).length);
        });
        return counts;
    }, [map]);

    return (
        <>
            <Dialog
                isOpen={props.isOpen}
                onClose={props.onClose}
                title={"Map Asset DB"}
                portalClassName={isDarkMode ? "bp5-dark" : ""}
            >
                <div style={{ margin: 15 }}>
                    <Menu>
                        {map.assets?.map((asset, i) => (
                            <MenuItem
                                key={i}
                                text={asset.id}
                                icon={
                                    asset.blob.type.startsWith("image") ? (
                                        <img
                                            alt={asset.id}
                                            src={asset.url}
                                            style={{ maxWidth: 20, maxHeight: 20 }}
                                        />
                                    ) : "music"
                                }
                                labelElement={<span style={{ color: "gray" }}>{assetIDCounts.get(asset.id)}</span>}
                                onClick={() => {
                                    console.log(asset);
                                }}
                            />
                        ))}
                    </Menu>
                </div>
            </Dialog>
        </>
    );
}