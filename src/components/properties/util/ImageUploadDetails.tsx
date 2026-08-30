import {Box} from "@mui/material";
import {MaybeGUID} from "@/shared/types/GUID";
import useAsset from "../../../hooks/assets/useAsset";
import ImageUploadDetailsRow from "./ImageUploadDetailsRow";
import useSprite from "../../../hooks/sprites/useSprite";
import dataSizeToString from "@shared/utils/dataSizeToString";

export interface ImageUploadDetailsProps {
    assetID: MaybeGUID;
}

export default function ImageUploadDetails(props: ImageUploadDetailsProps) {
    const asset = useAsset(props.assetID);
    const sprite = useSprite(props.assetID);

    if (!asset || !sprite)
        return null;
    return (
        <Box
            sx={{
                color: "text.secondary",
                fontSize: 14,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box sx={{width: 150}}>
                <ImageUploadDetailsRow
                    label="Size"
                    value={`${sprite.width} x ${sprite.height}`}
                />
                <ImageUploadDetailsRow
                    label="Type"
                    value={asset.type}
                />
                <ImageUploadDetailsRow
                    label="File Size"
                    value={dataSizeToString(asset.blob.size)}
                />
            </Box>
        </Box>
    );
}