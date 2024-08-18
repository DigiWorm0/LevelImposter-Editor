import {List, Paper} from "@mui/material";
import TimelineElement from "./TimelineElement";
import TimelineAddRow from "./TimelineAddRow";

const TEMP_DATA = [0, 1];

export default function TimelineBody() {
    return (
        <Paper
            elevation={2}
            sx={{
                flexGrow: 1,
                overflowY: "auto"
            }}
        >
            <List
                dense
                sx={{padding: 0}}
            >
                {TEMP_DATA.map((_, index) => (
                    <TimelineElement key={index}/>
                ))}
            </List>

            <TimelineAddRow/>
        </Paper>
    );
}