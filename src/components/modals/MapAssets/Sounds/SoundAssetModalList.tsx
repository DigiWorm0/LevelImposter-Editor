import {Box, List, Typography} from "@mui/material";
import React from "react";
import GUID, {MaybeGUID} from "../../../../types/common/GUID";
import MapAssetModalDropdown from "../MapAssetModalDropdown";
import SoundAssetModalButton from "./SoundAssetModalButton";
import {useAtomValue} from "jotai";
import {allAssetsAtom} from "@editor/state/assetsStore";

export interface SoundAssetModalListProps {
    onClick: (id: GUID) => void;
    selectedID: MaybeGUID;
}

export default function SoundAssetModalList(props: SoundAssetModalListProps) {
    const allAssets = useAtomValue(allAssetsAtom);

    const soundAssets = allAssets?.filter(asset => asset.type.startsWith("audio/"));
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
                    <Box sx={{textAlign: "center", m: 2}}>
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
    );
}