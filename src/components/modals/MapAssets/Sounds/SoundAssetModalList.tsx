import { Box, List, Typography } from "@mui/material";
import React from "react";
import useMapAssetsValue from "../../../../hooks/assets/useMapAssets";
import GUID, { MaybeGUID } from "../../../../types/generic/GUID";
import MapAssetModalDropdown from "../MapAssetModalDropdown";
import SoundAssetModalButton from "./SoundAssetModalButton";

export interface SoundAssetModalListProps {
    onClick: (id: GUID) => void;
    selectedID: MaybeGUID;
}

export default function SoundAssetModalList(props: SoundAssetModalListProps) {
    const assets = useMapAssetsValue();

    const soundAssets = assets?.filter(asset => asset.type === "audio");
    const hasSoundAssets = soundAssets && soundAssets.length > 0;

    return (
        <MapAssetModalDropdown name={"Sounds"}>
            <List dense>
                {soundAssets?.map(asset => (
                    <SoundAssetModalButton
                        key={asset.id}
                        id={asset.id}
                        isActive={props.selectedID === asset.id}
                        onClick={() => props.onClick(asset.id)}
                    />
                )) ?? []}

                {!hasSoundAssets && (
                    <Box sx={{ textAlign: "center", m: 2 }}>
                        <Typography
                            color={"text.secondary"}
                            variant={"body2"}
                        >
                            No sound assets found.
                        </Typography>
                    </Box>
                )}
            </List>
        </MapAssetModalDropdown>
    )
}