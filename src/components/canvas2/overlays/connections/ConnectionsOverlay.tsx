import GUID from "../../../../types/common/GUID";
import {useElementValue} from "../../../../hooks/elements/useElements";
import {useConnections} from "../../../../hooks/elements/useConnections";
import {useSettingsValue} from "../../../../hooks/useSettings";
import ArrowOverlay from "./ArrowOverlay";

export interface ConnectionOverlayProps {
    elementID: GUID;
}

const ARROW_OVERLAY_OFFSET = 6;

export default function ConnectionsOverlay(props: ConnectionOverlayProps) {
    const element = useElementValue(props.elementID);
    const [targetConnections, sourceConnections] = useConnections(props.elementID);
    const settings = useSettingsValue();

    if (!element || !settings.showConnectionArrows)
        return null;
    return (
        <pixiContainer>
            {targetConnections.map((connectionElement) => (
                <ArrowOverlay
                    key={connectionElement.id}
                    fromID={props.elementID}
                    toID={connectionElement.id}
                    color={0xAC2F33}
                    arrowHeadPos={"to"}
                    offset={sourceConnections.length > 0 ? -ARROW_OVERLAY_OFFSET : 0}
                />
            ))}

            {sourceConnections.map((connectionElement) => (
                <ArrowOverlay
                    key={connectionElement.id}
                    fromID={props.elementID}
                    toID={connectionElement.id}
                    color={0x215DB0}
                    arrowHeadPos={"from"}
                    offset={targetConnections.length > 0 ? ARROW_OVERLAY_OFFSET : 0}
                />
            ))}
        </pixiContainer>
    );
}