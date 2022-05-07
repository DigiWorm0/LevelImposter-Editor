import '../style/common.css';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

export default function App() {
    return (
        <div className="d-flex p-0 h-100 justify-content-between" >
            <LeftSidebar />
            <Canvas />
            <RightSidebar />
        </div>
    );
}
