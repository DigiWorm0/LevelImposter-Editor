import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import GUID from "../../../../types/generic/GUID";
import { useMapAssetValue } from "../../../../hooks/assets/useMapAsset";
import { VolumeUp } from "@mui/icons-material";
import toSizeString from "../../../../utils/strings/toSizeString";
import toDurationString from "../../../../utils/strings/toDurationString";

export interface SoundAssetModalButtonProps {
    id: GUID;
    isActive: boolean;
    onClick: () => void;
}

export default function SoundAssetModalButton(props: SoundAssetModalButtonProps) {
    const asset = useMapAssetValue(props.id);
    const [soundData, setSoundData] = React.useState<HTMLAudioElement | null>(null);

    React.useEffect(() => {
        if (!asset)
            return;

        const audio = new Audio(asset.url);
        audio.onloadeddata = () => setSoundData(audio);

        return () => {
            audio.onloadeddata = null;
            audio.remove();
        }
    }, [asset]);

    if (!asset)
        return null;
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={props.onClick} selected={props.isActive}>
                <ListItemIcon>
                    <VolumeUp />
                </ListItemIcon>
                <ListItemText
                    primary={toDurationString(soundData?.duration ?? 0)}
                    secondary={toSizeString(asset.blob.size)}
                />
            </ListItemButton>
        </ListItem>
    );
}