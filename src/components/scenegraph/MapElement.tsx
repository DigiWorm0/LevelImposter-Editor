import { H2 } from "@blueprintjs/core";
import useElement from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";

export default function MapElement(props: { id: GUID }) {
    const [element, setElement] = useElement(props.id);

    return (
        <div className="map-element">
            <H2>
                {element.name}
            </H2>
        </div>
    )
}