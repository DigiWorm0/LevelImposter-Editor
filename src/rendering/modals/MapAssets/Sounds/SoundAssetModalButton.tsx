import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";
import GUID from "@shared/types/GUID";
import {VolumeUp} from "@mui/icons-material";
import dataSizeToString from "@shared/utils/dataSizeToString";
import {useAtomValue} from "jotai";
import {assetsAtomFamily} from "@editor/assets/assetsStore";

export interface SoundAssetModalButtonProps {
    id: GUID;
    isActive: boolean;
    onClick: () => void;
}

export default function SoundAssetModalButton(props: SoundAssetModalButtonProps) {
    const asset = useAtomValue(assetsAtomFamily(props.id));
    const [soundData, setSoundData] = React.useState<HTMLAudioElement | null>(null);

    React.useEffect(() => {
        if (!asset)
            return;

        const audio = new Audio(asset.url);
        audio.onloadeddata = () => setSoundData(audio);

        return () => {
            audio.onloadeddata = null;
            audio.remove();
        };
    }, [asset]);

    if (!asset)
        return null;
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={props.onClick} selected={props.isActive}>
                <ListItemIcon>
                    <VolumeUp/>
                </ListItemIcon>
                <ListItemText
                    primary={toDurationString(soundData?.duration ?? 0)}
                    secondary={dataSizeToString(asset.blob.size)}
                />
            </ListItemButton>
        </ListItem>
    );
}

/**
 * Converts a number of seconds into a human-readable duration string (e.g., "1h 2m 3s").
 * @param seconds The number of seconds to convert.
 * @returns A string representing the duration in hours, minutes, and seconds.
 */
function toDurationString(seconds: number) {
    seconds = Math.floor(seconds);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0)
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    if (minutes > 0)
        return `${minutes}m ${remainingSeconds}s`;
    return `${remainingSeconds}s`;
}