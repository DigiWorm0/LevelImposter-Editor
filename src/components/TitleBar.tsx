import useMap from '../hooks/useMap';
import '../style/components.css';

export default function TitleBar() {
    const [map] = useMap();

    return (
        <div className="bg-sidebar-header p-1 fs-6" >
            <b>Map Title</b>
        </div>
    );
}
