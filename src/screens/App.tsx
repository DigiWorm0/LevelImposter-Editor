import CheckMobile from '../components/dialogs/CheckMobile';
import useSettings from '../hooks/useSettings';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Topbar from './Topbar';

export default function App() {
    const [settings] = useSettings();
    return (
        <div className={"app" + (settings.isDarkMode ? " bp4-dark" : "")}>
            <Topbar />
            <LeftSidebar />
            <Canvas />
            <RightSidebar />
            <CheckMobile />
        </div>
    );
}
