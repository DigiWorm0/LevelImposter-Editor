import GlobalHooks from "../utils/GlobalHooks";
import useEmbed from "../../hooks/embed/useEmbed";
import Canvas from "./Canvas";
import EmbeddedOverlay from "../overlays/EmbeddedOverlay";
import EditorOverlay from "../overlays/EditorOverlay";
import SpriteAnimEditorModal from "../modals/SpriteAnimation/SpriteAnimEditorModal";

export default function Content() {
    const isEmbedded = useEmbed();

    return (
        <div className={"app"}>
            {/* Meta Content */}
            <GlobalHooks/>

            {/* Global Modals */}
            <SpriteAnimEditorModal/>

            {/* Overlays */}
            {!isEmbedded && <EditorOverlay/>}
            {isEmbedded && <EmbeddedOverlay/>}

            {/* Background Canvas */}
            <Canvas/>
        </div>
    );
}