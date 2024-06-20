import { Text } from "react-konva";
import { useSelectedElemIDValue } from "../../hooks/elements/useSelectedElem";
import { UNITY_SCALE } from "../../types/generic/Constants";
import { MaybeGUID } from "../../types/generic/GUID";
import { useElementValue } from "../../hooks/elements/useElements";

export interface SelectedObjectErrorProps {
    elementID?: MaybeGUID;
}

export default function MapElementError(props: SelectedObjectErrorProps) {
    const selectedElemID = useSelectedElemIDValue();
    const elem = useElementValue(props.elementID ?? selectedElemID);

    const x = (elem?.x ?? 0) * UNITY_SCALE;
    const y = (elem?.y ?? 0.7) * UNITY_SCALE;

    return (
        <>
            <Text
                text={"Uh oh, something went wrong!"}
                fontStyle={"bold"}
                fill={"#ae2929"}
                stroke={"#000"}
                strokeWidth={1}
                fontSize={40}
                x={x - window.innerWidth / 2}
                y={-y - window.innerHeight / 2}
                width={window.innerWidth}
                height={window.innerHeight}
                align={"center"}
                verticalAlign={"middle"}
                listening={false}
            />
            <Text
                text={"See console for more details"}
                fill={"#802929"}
                stroke={"#000"}
                strokeWidth={0.8}
                fontSize={30}
                x={x - window.innerWidth / 2}
                y={-y - window.innerHeight / 2 + 35}
                width={window.innerWidth}
                height={window.innerHeight}
                align={"center"}
                verticalAlign={"middle"}
                listening={false}
            />
        </>
    );
}