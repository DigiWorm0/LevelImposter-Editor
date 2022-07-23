import { Provider } from 'jotai';
import CheckMobile from '../components/dialogs/CheckMobile';
import { PROVIDER_SCOPE } from '../hooks/jotai/Jotai';
import useSettings from '../hooks/jotai/useSettings';
import useEmbed from '../hooks/useEmbed';
import useIDParam from '../hooks/useIDParam';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar';
import OpenInEditor from './OpenInEditor';
import RightSidebar from './RightSidebar';
import Topbar from './Topbar';

export default function App() {
    const [settings] = useSettings();
    const isEmbeded = useEmbed();
    useIDParam();

    return (
        <div className={"app" + (settings.isDarkMode ? " bp4-dark" : "")}>
            <Provider scope={PROVIDER_SCOPE}>
                {!isEmbeded && (<>
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
            </Provider>
        </div>
    );
}
