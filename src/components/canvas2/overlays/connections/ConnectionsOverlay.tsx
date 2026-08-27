import GUID from "../../../../types/common/GUID";
import {useSettingsValue} from "../../../../hooks/useSettings";
import ArrowOverlay from "./ArrowOverlay";
import {useAtomValue} from "jotai";
import {connectionsAtomFamily} from "../../../../editor/state/connectionStore";
import {useElement} from "../../../../hooks/elements/useElement";

export interface ConnectionOverlayProps {
    elementID: GUID;
}

const ARROW_OVERLAY_OFFSET = 6;

export default function ConnectionsOverlay(props: ConnectionOverlayProps) {
    const element = useElement(props.elementID);
    const [targetConnections, sourceConnections] = useAtomValue(connectionsAtomFamily(props.elementID));
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