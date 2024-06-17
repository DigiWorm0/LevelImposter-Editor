import { Divider } from "@mui/material";

export default function NavDivider() {
    return (
        <Divider
            variant={"middle"}
            orientation={"vertical"}
            flexItem
            sx={{ marginLeft: 1, marginRight: 1 }}
        />
    );
}