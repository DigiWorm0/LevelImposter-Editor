import {Box} from "@mui/material";

export interface ImageUploadDetailsRowProps {
    label: string;
    value: string;
}

export default function ImageUploadDetailsRow(props: ImageUploadDetailsRowProps) {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mb: 1,
            }}
        >
            <Box sx={{fontWeight: "bold"}}>
                {props.label}
            </Box>
            <Box>
                {props.value}
            </Box>
        </Box>
    );
}