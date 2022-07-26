import { ControlGroup, FormGroup, NumericInput } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import PanelContainer from "./PanelContainer";

export default function CamPanel() {
    const [element, setElement] = useSelectedElem();

    if (!element
        || element.type !== "util-cam")
        return null;

    return (
        <PanelContainer title="Camera">
            <FormGroup label="Offset">
                <ControlGroup fill>
                    <NumericInput
                        key={element.id + "-camXOffset"}
                        fill
                        defaultValue={element.properties.camXOffset === undefined ? 0 : element.properties.camXOffset}
                        minorStepSize={0.1}
                        stepSize={1}
                        majorStepSize={10}
                        onValueChange={(val) => {
                            !isNaN(val) && setElement({ ...element, properties: { ...element.properties, camXOffset: val } });
                        }} />
                    <NumericInput
                        key={element.id + "-camYOffset"}
                        fill
                        defaultValue={element.properties.camYOffset === undefined ? 0 : element.properties.camYOffset}
                        minorStepSize={0.1}
                        stepSize={1}
                        majorStepSize={10}
                        onValueChange={(val) => {
                            !isNaN(val) && setElement({ ...element, properties: { ...element.properties, camYOffset: val } });
                        }} />
                </ControlGroup>
            </FormGroup>
            <FormGroup label="Zoom">
                <NumericInput
                    key={element.id + "-camZoom"}
                    fill
                    defaultValue={element.properties.camZoom === undefined ? 3 : element.properties.camZoom}
                    minorStepSize={0.1}
                    stepSize={0.5}
                    majorStepSize={1}
                    onValueChange={(val) => {
                        !isNaN(val) && setElement({ ...element, properties: { ...element.properties, camZoom: val } });
                    }} />
            </FormGroup>
        </PanelContainer>
    );
}
