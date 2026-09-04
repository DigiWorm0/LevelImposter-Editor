import GUID from "@shared/types/GUID";
import ArrowOverlay from "./ArrowOverlay";
import {useAtomValue} from "jotai";
import {useElement} from "@editor/document/elements/useElement";
import {inboundConnectionIDsAtomFamily, outboundConnectionIDsAtomFamily} from "@/hooks/useElemConnections";
import {settingsAtom} from "@editor/settings/settingsStore";

export interface ConnectionOverlayProps {
    elementID: GUID;
}

const ARROW_OVERLAY_OFFSET = 6;

export default function ConnectionsOverlay(props: ConnectionOverlayProps) {
    const element = useElement(props.elementID);

    const outboundConnectionIDs = useAtomValue(outboundConnectionIDsAtomFamily(props.elementID));
    const inboundConnectionsIDs = useAtomValue(inboundConnectionIDsAtomFamily(props.elementID));
    const {showConnectionArrows} = useAtomValue(settingsAtom);

    if (!element || !showConnectionArrows)
        return null;
    return (
        <pixiContainer>
            {outboundConnectionIDs.map(id => (
                <ArrowOverlay
                    key={id}
                    fromID={props.elementID}
                    toID={id}
                    color={0xAC2F33}
                    arrowHeadPos={"to"}
                    offset={inboundConnectionsIDs.length > 0 ? -ARROW_OVERLAY_OFFSET : 0}
                />
            ))}

            {inboundConnectionsIDs.map(id => (
                <ArrowOverlay
                    key={id}
                    fromID={props.elementID}
                    toID={id}
                    color={0x215DB0}
                    arrowHeadPos={"from"}
                    offset={outboundConnectionIDs.length > 0 ? ARROW_OVERLAY_OFFSET : 0}
                />
            ))}
        </pixiContainer>
    );
}