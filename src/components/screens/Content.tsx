import GlobalHooks from "../utils/GlobalHooks";
import MapHelmet from "../utils/MapHelmet";
import useEmbed from "../../hooks/embed/useEmbed";
import Canvas from "./Canvas";
import EmbeddedOverlay from "../overlays/EmbeddedOverlay";
import EditorOverlay from "../overlays/EditorOverlay";

export default function Content() {
    const isEmbedded = useEmbed();

    return (
        <div className={"app"}>

            {/* Meta Content */}
            <GlobalHooks/>
            {!isEmbedded && <MapHelmet/>}


            {/* Overlays */}
            {!isEmbedded && <EditorOverlay/>}
            {isEmbedded && <EmbeddedOverlay/>}

            {/* Background Canvas */}
            <Canvas/>
        </div>
    );
}