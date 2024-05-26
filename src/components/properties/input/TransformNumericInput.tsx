import MaterialIcon, { IconName } from "../../utils/MaterialIcon";
import LIElement from "../../../types/li/LIElement";
import FlexNumericInput from "../util/FlexNumericInput";
import { useSelectedElemIDValue } from "../../../hooks/elements/useSelectedElem";
import useSelectedElemTransform from "../../../hooks/elements/useSelectedElemTransform";
import { InputAdornment } from "@mui/material";

export interface TransformNumericInputProps {
    name: string;
    prop: keyof LIElement;
    icon?: IconName;
}

export default function TransformNumericInput(props: TransformNumericInputProps) {
    const selectedElementID = useSelectedElemIDValue();
    const [value, setValue] = useSelectedElemTransform<number>(props.prop);

    if (value === undefined)
        return null;
    return (
        <FlexNumericInput
            value={value}
            onChange={setValue}
            stepSize={0.1}
            inputProps={{
                size: "small",
                fullWidth: true,
                placeholder: props.name,
                InputProps: props.icon && {
                    endAdornment: (<InputAdornment position={"end"}><MaterialIcon icon={props.icon} /></InputAdornment>)
                }
            }}
        />
    )
}