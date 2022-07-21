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
                        value={element.properties.camXOffset}
                        minorStepSize={0.001}
                        onValueChange={(value) => {
                            element.properties.camXOffset = value;
                            setElement(element);
                        }} />
                    <NumericInput
                        fill
                        value={element.properties.camYOffset}
                        minorStepSize={0.001}
                        onValueChange={(value) => {
                            element.properties.camYOffset = value;
                            setElement(element);
                        }} />
                </ControlGroup>
            </FormGroup>
            <FormGroup label="Zoom">
                <NumericInput
                    fill
                    value={element.properties.camZoom}
                    minorStepSize={0.001}
                    onValueChange={(value) => {
                        element.properties.camZoom = value;
                        setElement(element);
                    }} />
            </FormGroup>
        </div>
    );
}
