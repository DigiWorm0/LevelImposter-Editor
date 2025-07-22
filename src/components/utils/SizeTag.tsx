import {MaybeGUID} from "../../types/common/GUID";
import {Box, Chip} from "@mui/material";
import {useMapAssetValue} from "../../hooks/assets/useMapAsset";
import toSizeString from "../../utils/strings/toSizeString";

export interface SizeTagProps {
    assetID: MaybeGUID;
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
    const asset = useMapAssetValue(props.assetID);
    if (!asset)
        return null;

    const assetSize = asset?.blob.size ?? 0;
    const sizeString = toSizeString(assetSize);
    const sizeColor = assetSize < GOOD_SIZE ? "success" : assetSize < BAD_SIZE ? "warning" : "error";
    const typeString = asset.type in TYPES_TO_TEXT ?
        TYPES_TO_TEXT[asset.type as keyof typeof TYPES_TO_TEXT] :
        asset.type;
    const typeColor = typeString !== "DDS" ? "error" : "primary";

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
        </Box>
    );
}