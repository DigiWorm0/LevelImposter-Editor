import { Provider } from 'jotai';
import CheckMobile from '../components/dialogs/CheckMobile';
import { PROVIDER_SCOPE } from '../hooks/jotai/Jotai';
import useSettings from '../hooks/jotai/useSettings';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Topbar from './Topbar';

export default function App() {
    const [settings] = useSettings();

    return (
        <div className={"app" + (settings.isDarkMode ? " bp4-dark" : "")}>
            <Provider scope={PROVIDER_SCOPE}>
                <Topbar />
                <LeftSidebar />
                <Canvas />
                <RightSidebar />
                <CheckMobile />
            </Provider>
        </div>
    );
}
