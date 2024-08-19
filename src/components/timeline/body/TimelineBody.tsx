import {List, Paper} from "@mui/material";
import TimelineElement from "./TimelineElement";
import TimelineAddRow from "../footer/TimelineAddRow";
import {useSelectedElemPropValue} from "../../../hooks/elements/useSelectedElemProperty";

export default function TimelineBody() {
    const animTargets = useSelectedElemPropValue("animTargets");

    return (
        <Paper
            elevation={2}
            sx={{
                flexGrow: 1,
                overflowY: "auto",
                overflowX: "hidden"
            }}
        >
            <List
                dense
                sx={{padding: 0}}
            >
                {animTargets?.map((target) => (
                    <TimelineElement
                        key={target.id}
                        id={target.id}
                    />
                ))}
            </List>

            <TimelineAddRow/>
        </Paper>
    );
}