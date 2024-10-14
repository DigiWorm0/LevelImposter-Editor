import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import {AirlineStops, Compress, MultipleStop, RotateRight, Scale} from "@mui/icons-material";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import InputGroup from "../input/InputGroup";

export default function PhysicsPanel() {
    const {t} = useTranslation();
    const isPhysics = useIsSelectedElemType("util-physics");

    if (!isPhysics)
        return null;
    return (
        <PanelContainer title={t("physics.title") as string}>
            <ElementPropNumericInput
                name={t("physics.friction")}
                prop="physicsFriction"
                defaultValue={0.6}
                icon={<Compress/>}
                min={0}
                stepSize={0.05}
                max={1}
            />
            <ElementPropNumericInput
                name={t("physics.bounce")}
                prop="physicsBounciness"
                defaultValue={0.6}
                icon={<AirlineStops/>}
                min={0}
                stepSize={0.05}
                max={1}
            />
            <ElementPropNumericInput
                name={t("physics.mass")}
                prop="physicsMass"
                defaultValue={10}
                icon={<Scale/>}
                min={0}
                stepSize={1}
            />
            <ElementPropNumericInput
                name={t("physics.linearDrag")}
                prop="physicsDrag"
                defaultValue={100}
                icon={<MultipleStop/>}
                min={0}
                stepSize={0.1}
            />
            <ElementPropNumericInput
                name={t("physics.angularDrag")}
                prop="physicsAngularDrag"
                defaultValue={100}
                icon={<RotateRight/>}
                min={0}
                stepSize={0.1}
            />
            <InputGroup>
                <ElementPropSwitch
                    name={t("physics.freezeX")}
                    prop="physicsFreezeX"
                    defaultValue={false}
                />
                <ElementPropSwitch
                    name={t("physics.freezeY")}
                    prop="physicsFreezeY"
                    defaultValue={false}
                />
            </InputGroup>
            <ElementPropSwitch
                name={t("physics.freezeRotation")}
                prop="physicsFreezeRotation"
                defaultValue={false}
            />
        </PanelContainer>
    );
}
