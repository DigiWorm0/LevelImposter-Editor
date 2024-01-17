import CheckMobile from "../components/dialogs/CheckMobile";
import GlobalHooks from "../components/utils/GlobalHooks";
import MapHelmet from "../components/utils/MapHelmet";
import { useSettingsValue } from "../hooks/jotai/useSettings";
import useEmbed from "../hooks/useEmbed";
import Canvas from "./Canvas";
import LeftSidebar from "./LeftSidebar";
import OpenInEditor from "./OpenInEditor";
import RightSidebar from "./RightSidebar";
import Topbar from "./Topbar";

export default function Content() {
    const isEmbeded = useEmbed();
    const settings = useSettingsValue();

    return (
        <div className={"app" + (settings.isDarkMode === false ? "" : " bp5-dark")}>
            <GlobalHooks />

            {!isEmbeded && (<>
                <MapHelmet />
                <Topbar />
                <LeftSidebar />
            </>)}

            <Canvas />

            {!isEmbeded && (<>
                <RightSidebar />
                <CheckMobile />
            </>)}

            {isEmbeded && (<>
                <OpenInEditor />
            </>)}
        </div>
    );
}