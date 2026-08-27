import {MaybeGUID} from "../../types/common/GUID";
import {Box, Chip} from "@mui/material";
import useAsset from "../../hooks/assets/useAsset";
import toSizeString from "../../utils/strings/toSizeString";

export interface SizeTagProps {
    assetID: MaybeGUID;
    isAnimated?: boolean;
}

const TYPES_TO_TEXT = {
    "image/dds": "DDS",
    "image/png": "PNG",
    "image/jpeg": "JPEG",
    "image/webp": "WEBP",
    "image/gif": "GIF",
    "image/bmp": "BMP",
    "image/tga": "TGA",
};

const GOOD_SIZE = 1000 * 1000 * 2; // 2MB
const BAD_SIZE = 1000 * 1000 * 5; // 10MB

export default function SizeTag(props: SizeTagProps) {
    const asset = useAsset(props.assetID);
    if (!asset)
        return null;

    const typeString = asset.type in TYPES_TO_TEXT ?
        TYPES_TO_TEXT[asset.type as keyof typeof TYPES_TO_TEXT] :
        asset.type;

    const isDDS = typeString === "DDS";

    const assetSize = asset?.blob.size ?? 0;
    const sizeString = toSizeString(assetSize);
    const sizeColor = isDDS ? "primary" :
        assetSize < GOOD_SIZE ? "success" :
            assetSize < BAD_SIZE ? "warning" :
                "error";


    const typeColor = isDDS ? "success" : "error";

    return (
        <Box sx={{textAlign: "center", p: 1}}>
            <Chip
                color={sizeColor}
                label={sizeString}
            />
            <Chip
                color={typeColor}
                label={typeString}
                sx={{ml: 1}}
            />
            {props.isAnimated && (
                <Chip
                    color={"info"}
                    label={"Animated"}
                    sx={{ml: 1}}
                />
            )}
        </Box>
    );
}