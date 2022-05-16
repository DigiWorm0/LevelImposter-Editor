import { Typography, Card, CardContent, CardActionArea, Grid } from "@mui/material";
import AUElement from "../../types/au/AUElement";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

export default function AddObjectButton(props: { onClick: (elem: AUElement) => void, element: AUElement }) {
    const url = URL_PREFIX + props.element.type + URL_SUFFIX;

    return (
        <Grid item>
            <Card
                variant="outlined"
                sx={{
                    textAlign: "center"
                }}>
                <CardActionArea onClick={() => { props.onClick(props.element); }}>
                    <CardContent>
                        <img
                            src={url}
                            alt={props.element.name}
                        />
                        <Typography
                            variant="subtitle2"
                            noWrap>
                            {props.element.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}