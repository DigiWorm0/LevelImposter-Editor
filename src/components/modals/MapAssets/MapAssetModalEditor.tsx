import {MaybeGUID} from "@/shared/types/GUID";
import {Box, Button, ButtonGroup, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {CloudDownload, Image} from "@mui/icons-material";
import ExpandText from "../../screens/ExpandText";
import dataSizeToString from "@shared/utils/dataSizeToString";
import React from "react";
import useAsset from "../../../hooks/assets/useAsset";
import ImageAsset from "../../utils/ImageAsset";
import AudioPlayer from "../../properties/util/AudioPlayer";
import ReplaceAssetButton from "../../buttons/ReplaceAssetButton";
import {downloadRawAsset} from "@editor/assets/downloadAsset";

export interface MapAssetModalEditorProps {
    id: MaybeGUID;
    onClose: () => void;
}

export default function MapAssetModalEditor(props: MapAssetModalEditorProps) {
    const asset = useAsset(props.id);

    return (
        <Box sx={{flex: 1, padding: 2}}>
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
                    {asset.type.startsWith("image/") && (
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
                                <TableCell align={"center"}><ExpandText text={asset.id}/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align={"center"}>Type</TableCell>
                                <TableCell align={"center"}>{asset.blob.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align={"center"}>Size</TableCell>
                                <TableCell align={"center"}>{dataSizeToString(asset.blob.size)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {/* Actions */}
                    <ButtonGroup sx={{mt: 1}}>
                        <Button
                            onClick={() => downloadRawAsset(props.id)}
                            variant={"outlined"}
                            color={"success"}
                            endIcon={<CloudDownload/>}
                        >
                            Download
                        </Button>
                        <ReplaceAssetButton assetID={props.id}/>
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
                        sx={{fontSize: 64}}
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