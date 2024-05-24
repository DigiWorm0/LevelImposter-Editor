import { MaybeGUID } from "../../../../types/generic/GUID";
import { Box, Button, ButtonGroup, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useMapAssetValue } from "../../../../hooks/map/assets/useMapAsset";
import React from "react";
import toSizeString from "../../../../utils/toSizeString";
import ExpandText from "../../../screens/ExpandText";
import { CloudDownload, Delete, Upload } from "@mui/icons-material";

export interface ImageAssetModalEditorProps {
    id: MaybeGUID;
    onClose: () => void;
}

export default function ImageAssetModalEditor(props: ImageAssetModalEditorProps) {
    const asset = useMapAssetValue(props.id);
    const [image, setImage] = React.useState<HTMLImageElement | null>(null);

    React.useEffect(() => {
        if (asset?.type !== "image")
            return;

        const img = new Image();
        img.src = asset.url;
        img.onload = () => setImage(img);

        return () => {
            img.onload = null;
        }
    }, [asset]);

    if (asset?.type !== "image")
        return null;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <img
                alt={asset.id}
                src={asset.url}
                style={{
                    objectFit: "contain",
                    height: 200,
                    maxWidth: "80%"
                }}
            />
            <Table size={"small"}>
                <TableBody>
                    <TableRow>
                        <TableCell align={"center"}>ID</TableCell>
                        <TableCell align={"center"}><ExpandText text={asset.id} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align={"center"}>Type</TableCell>
                        <TableCell align={"center"}>{asset.blob.type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align={"center"}>Size</TableCell>
                        <TableCell align={"center"}>{toSizeString(asset.blob.size)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align={"center"}>Resolution</TableCell>
                        <TableCell align={"center"}>{image?.width}x{image?.height}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <ButtonGroup sx={{ mt: 1 }}>
                <Button
                    onClick={props.onClose}
                    variant={"outlined"}
                    color={"success"}
                    endIcon={<CloudDownload />}
                >
                    Download
                </Button>
                <Button
                    onClick={props.onClose}
                    variant={"outlined"}
                    color={"primary"}
                    endIcon={<Upload />}
                >
                    Replace
                </Button>
                <Button
                    onClick={props.onClose}
                    variant={"outlined"}
                    color={"error"}
                    endIcon={<Delete />}
                >
                    Delete
                </Button>
            </ButtonGroup>
        </Box>
    )
}