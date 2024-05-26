import { Box, Button, Typography } from "@mui/material";
import { useMapValue } from "../../../hooks/map/useMap";
import MapCard from "../../utils/MapCard";

export default function PublishModalUpload() {
    const map = useMapValue();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <MapCard map={map} />
            <Button
                variant={"contained"}
                sx={{ m: 1 }}
                fullWidth
            >
                Publish
            </Button>
            <Typography
                variant={"body2"}
                color={"textSecondary"}
                sx={{ textAlign: "center" }}
            >
                By publishing, you agree to abide by the
                {" "}
                <a href="https://levelimposter.net/#/policy" target="_blank">
                    rules & policies
                </a>
                {" "}
                of the LevelImposter workshop.

            </Typography>
        </Box>
    );
}
