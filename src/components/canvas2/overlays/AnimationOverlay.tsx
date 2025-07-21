import GUID from "../../../types/generic/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {useSettingsValue} from "../../../hooks/useSettings";
import {UNITY_SCALE} from "../../../types/generic/Constants";
import useAnimPropertyValue from "../../../hooks/timeline/useAnimPropertyValue";
import useElementSprite from "../../../hooks/canvas/sprite/useElementSprite";
import useAnimTarget from "../../../hooks/timeline/useAnimTarget";
import degToRad from "../../../utils/canvas/degToRad";

export interface AnimationOverlayProps {
    elementID: GUID;
}

export default function AnimationOverlay(props: AnimationOverlayProps) {
    const element = useElementValue(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const {animPreview} = useSettingsValue();

    // Animation Properties
    // TODO: Replace this with refs
    const targetID = props.elementID;
    const [animTarget] = useAnimTarget(targetID);
    const [x] = useAnimPropertyValue({targetID, property: "x"});
    const [y] = useAnimPropertyValue({targetID, property: "y"});
    const [rotation] = useAnimPropertyValue({targetID, property: "rotation"});
    const [scaleX] = useAnimPropertyValue({targetID, property: "xScale"});
    const [scaleY] = useAnimPropertyValue({targetID, property: "yScale"});

    if (!element ||
        !animTarget ||
        !sprite ||
        sprite.destroyed ||
        !animPreview)
        return null;
    return (
        <pixiSprite
            texture={sprite}
            x={(x ?? 0) * UNITY_SCALE}
            y={-(y ?? 0) * UNITY_SCALE}
            rotation={-degToRad(rotation ?? 0)}
            scale={{
                x: scaleX ?? 1,
                y: scaleY ?? 1
            }}
            anchor={0.5}
            eventMode={"none"}
        />
    );
}