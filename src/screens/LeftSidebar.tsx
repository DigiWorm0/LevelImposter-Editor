import TitleBar from "../components/TitleBar";
import useMap from "../hooks/useMap";

export default function LeftSidebar() {
    const [map, setMap] = useMap();

    return (
        <div className="bg-sidebar d-flex flex-column flex-shrink-0" style={{ width: 300 }}>
            <TitleBar />
        </div>
    );
}