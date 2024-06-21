import GUID from "../../types/generic/GUID";
import { Box, Chip } from "@mui/material";
import { useMapAssetValue } from "../../hooks/assets/useMapAsset";
import toSizeString from "../../utils/strings/toSizeString";

export interface SizeTagProps {
    assetID?: GUID;
}

const GOOD_SIZE = 1000 * 1000 * 2; // 2MB
const BAD_SIZE = 1000 * 1000 * 5; // 10MB

export default function SizeTag(props: SizeTagProps) {
    const asset = useMapAssetValue(props.assetID);
    if (!asset)
        return null;

    const assetSize = asset?.blob.size ?? 0;
    const sizeString = toSizeString(assetSize);
    const sizeColor = assetSize < GOOD_SIZE ? "success" : assetSize < BAD_SIZE ? "warning" : "error";

    return (
        <Box sx={{ textAlign: "center", p: 1 }}>

            <Chip
                color={sizeColor}
                label={sizeString}
            />
        </Box>
    );
}