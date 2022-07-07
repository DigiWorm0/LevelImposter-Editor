import { H1, Spinner } from '@blueprintjs/core';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Topbar from './Topbar';

export default function App() {
    return (
        <div className="app">
            <Topbar />
            <LeftSidebar />
            <Canvas />
            <RightSidebar />
        </div>
    );
}
