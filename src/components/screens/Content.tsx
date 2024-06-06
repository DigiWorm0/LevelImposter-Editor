import BrowserWarningModal from "../modals/BrowserWarningModal";
import GlobalHooks from "../utils/GlobalHooks";
import MapHelmet from "../utils/MapHelmet";
import useEmbed from "../../hooks/embed/useEmbed";
import Canvas from "./Canvas";
import LeftSidebar from "./LeftSidebar";
import OpenInEditor from "./OpenInEditor";
import RightSidebar from "./RightSidebar";
import Topbar from "./Topbar";

export default function Content() {
    const isEmbedded = useEmbed();

    return (
        <div className={"app"}>
            <GlobalHooks />

            {!isEmbedded && (<>
                <MapHelmet />
                <Topbar />
                <LeftSidebar />
            </>)}

            <Canvas />

            {!isEmbedded && (<>
                <RightSidebar />
                <BrowserWarningModal />
            </>)}

            {isEmbedded && (<>
                <OpenInEditor />
            </>)}
        </div>
    );
}