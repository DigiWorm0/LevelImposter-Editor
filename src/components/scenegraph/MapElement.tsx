import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import useElement from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";

export default function MapElement(props: { id: GUID }) {
    const [element, setElement] = useElement(props.id);

    return (
        <Box>
            <Typography
                variant="body2"
                noWrap
                sx={{
                    ml: 2,
                    mr: 2,
                    mt: 1
                }}>
                {element.name}
            </Typography>
        </Box>
    )
}