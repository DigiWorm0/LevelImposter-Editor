import { ControlGroup, Divider, FormGroup, H5, NumericInput } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";

export default function CamPanel() {
    const [element, setElement] = useSelectedElem();

    if (!element
        || element.type !== "util-cam")
        return null;

    return (
        <div className="cam-panel">
            <H5 style={{ marginTop: 25 }}>Camera</H5>
            <Divider />

            <FormGroup label="Offset">
                <ControlGroup fill>
                    <NumericInput
                        fill
                        value={element.properties.camXOffset === undefined ? 0 : element.properties.camXOffset}
                        minorStepSize={0.1}
                        stepSize={1}
                        majorStepSize={10}
                        onValueChange={(value) => {
                            setElement({ ...element, properties: { ...element.properties, camXOffset: value } });
                        }} />
                    <NumericInput
                        fill
                        value={element.properties.camYOffset === undefined ? 0 : element.properties.camYOffset}
                        minorStepSize={0.1}
                        stepSize={1}
                        majorStepSize={10}
                        onValueChange={(value) => {
                            setElement({ ...element, properties: { ...element.properties, camYOffset: value } });
                        }} />
                </ControlGroup>
            </FormGroup>
            <FormGroup label="Zoom">
                <NumericInput
                    fill
                    value={element.properties.camZoom === undefined ? 1 : element.properties.camZoom}
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    onValueChange={(value) => {
                        setElement({ ...element, properties: { ...element.properties, camZoom: value } });
                    }} />
            </FormGroup>
        </div>
    );
}
