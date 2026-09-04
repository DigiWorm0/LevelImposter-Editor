import GlobalHooks from "../utils/GlobalHooks";
import Canvas from "./Canvas";
import EmbeddedOverlay from "../overlays/EmbeddedOverlay";
import EditorOverlay from "../overlays/EditorOverlay";
import SpriteAnimEditorModal from "../modals/SpriteAnimation/SpriteAnimEditorModal";
import {isEmbedded} from "@editor/url/getEmbedFromURL";

export default function Content() {
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