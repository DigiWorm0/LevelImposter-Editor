import { MaybeGUID } from "../../../types/generic/GUID";
import { Box, Button, ButtonGroup, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { CloudDownload, Delete, Image } from "@mui/icons-material";
import ExpandText from "../../screens/ExpandText";
import toSizeString from "../../../utils/strings/toSizeString";
import React from "react";
import { useMapAssetValue } from "../../../hooks/assets/useMapAsset";
import ImageAsset from "../../utils/ImageAsset";
import AudioPlayer from "../../properties/util/AudioPlayer";
import useDeleteMapAsset from "../../../hooks/assets/useDeleteMapAsset";
import useDownloadMapAsset from "../../../hooks/assets/useDownloadMapAsset";
import ReplaceAssetButton from "../../buttons/ReplaceAssetButton";

export interface MapAssetModalEditorProps {
    id: MaybeGUID;
    onClose: () => void;
}

export default function MapAssetModalEditor(props: MapAssetModalEditorProps) {
    const asset = useMapAssetValue(props.id);
    const deleteAsset = useDeleteMapAsset();
    const downloadAsset = useDownloadMapAsset();

    return (
        <Box sx={{ flex: 1, padding: 2 }}>
            {asset && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {/* Image */}
                    {asset.type === "image" && (
                        <ImageAsset
                            assetID={props.id}
                            style={{
                                objectFit: "contain",
                                height: 200,
                                maxWidth: "80%"
                            }}
                        />
                    )}

                    {/* Sound */}
                    {asset.type === "audio" && (
                        <AudioPlayer
                            url={asset.url}
                            volume={1}
                            loop={false}
                        />
                    )}

                    {/* Table */}
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
                        </TableBody>
                    </Table>

                    {/* Actions */}
                    <ButtonGroup sx={{ mt: 1 }}>
                        <Button
                            onClick={() => downloadAsset({ id: props.id })}
                            variant={"outlined"}
                            color={"success"}
                            endIcon={<CloudDownload />}
                        >
                            Download
                        </Button>
                        <ReplaceAssetButton assetID={props.id} />
                        <Button
                            onClick={() => {
                                deleteAsset(props.id);
                                props.onClose();
                            }}
                            variant={"outlined"}
                            color={"error"}
                            endIcon={<Delete />}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </Box>
            )}

            {/* Placeholder */}
            {props.id === undefined && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        flex: 1,
                        height: "100%"
                    }}
                >
                    <Image
                        sx={{ fontSize: 64 }}
                        color={"disabled"}
                    />
                    <Typography
                        color={"text.secondary"}
                        variant={"body2"}
                    >
                        Select an asset to view its details.
                    </Typography>
                </Box>
            )}
        </Box>
    );
}