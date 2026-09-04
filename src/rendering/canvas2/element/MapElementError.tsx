import {UNITY_SCALE} from "@/types/amongus/Constants";
import {MaybeGUID} from "@/shared/types/GUID";
import {useElement} from "@editor/document/elements/useElement";

export interface SelectedObjectErrorProps {
    elementID?: MaybeGUID;
}

export default function MapElementError(props: SelectedObjectErrorProps) {
    const elem = useElement(props.elementID);
    const x = (elem?.x ?? 0) * UNITY_SCALE;
    const y = (elem?.y ?? 0) * -UNITY_SCALE;

    return (
        <>
            <pixiBitmapText
                eventMode={"none"}
                text={"Uh oh, something went wrong!"}
                x={x}
                y={y}

                anchor={0.5}

                // alpha={0.5}
                style={{
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    align: "center",
                    fill: 0xae2929,
                    stroke: {color: "black", width: 10},
                    fontSize: 70,
                }}
            />
            <pixiBitmapText
                eventMode={"none"}
                text={"See console for more details"}
                x={x}
                y={y + 70}

                anchor={0.5}

                // alpha={0.5}
                style={{
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    align: "center",
                    fill: 0x802929,
                    stroke: {color: "black", width: 10},
                    fontSize: 60,
                }}
            />
        </>
    );
}