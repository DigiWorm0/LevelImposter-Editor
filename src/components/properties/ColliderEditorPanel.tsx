import { Button, Card, ControlGroup, FormGroup, H6, NumericInput, Switch } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedCollider, { useSelectedColliderID } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import LICollider from "../../types/li/LICollider";
import DevInfo from "../utils/DevInfo";

const RESTRICTED_TYPES = [
    "util-room",
    "util-sound1",
    "util-sound2",
    "util-tele",
    "util-triggerarea",
    "util-triggersound",
];

export default function ColliderEditorPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedColliderID, setSelectedColliderID] = useSelectedColliderID();
    const [selectedCollider, setSelectedCollider] = useSelectedCollider();

    const isRestricted = RESTRICTED_TYPES.includes(selectedElem?.type || "");

    const delCollider = (collider: LICollider) => {
        if (!selectedElem)
            return;
        const colliders = selectedElem.properties.colliders?.filter(c => c.id !== collider.id);
        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, colliders } });
        if (selectedColliderID === collider.id)
            setSelectedColliderID(undefined);
    }

    if (!selectedCollider || !selectedElem)
        return null;

    return (
        <Card style={{ boxShadow: "none" }}>
            <H6>
                {t("collider.edit")}
            </H6>

            <DevInfo>
                {selectedCollider.id}
            </DevInfo>

            <Switch
                label={t("collider.solid") as string}
                checked={selectedCollider.isSolid}
                disabled={isRestricted}
                onChange={(e) => {
                    selectedCollider.isSolid = e.currentTarget.checked;
                    setSelectedElem({ ...selectedElem });
                }} />
            <Switch
                label={t("collider.blocksLight") as string}
                checked={selectedCollider.blocksLight}
                disabled={isRestricted}
                onChange={(e) => {
                    selectedCollider.blocksLight = e.currentTarget.checked;
                    setSelectedElem({ ...selectedElem });
                }} />
            <FormGroup label={t("collider.points") as string}>
                <NumericInput
                    fill
                    disabled={!selectedCollider}
                    min={2}
                    value={selectedCollider?.points.length}
                    onValueChange={(value) => {
                        if (value < 0)
                            return;
                        const points = [];
                        for (let i = 0; i < value; i++) {
                            if (i < selectedCollider.points.length)
                                points.push({
                                    x: selectedCollider.points[i].x,
                                    y: selectedCollider.points[i].y
                                });
                            else
                                points.push({ x: 0, y: 0 });
                        }
                        setSelectedCollider({ ...selectedCollider, points: points });
                    }} />
            </FormGroup>
            <div>
                {selectedCollider.points.map((point, index) => (
                    <ControlGroup fill key={index}>
                        <NumericInput
                            fill
                            disabled={!selectedCollider}
                            minorStepSize={0.001}
                            stepSize={0.01}
                            majorStepSize={0.1}
                            value={point.x.toString()}
                            onValueChange={(value) => {
                                const points = selectedCollider.points.map((p, i) => {
                                    if (i === index)
                                        return { x: value, y: p.y };
                                    return p;
                                });
                                setSelectedCollider({ ...selectedCollider, points });
                            }} />
                        <NumericInput
                            fill
                            disabled={!selectedCollider}
                            minorStepSize={0.001}
                            stepSize={0.01}
                            majorStepSize={0.1}
                            value={point.y.toString()}
                            onValueChange={(value) => {
                                const points = selectedCollider.points.map((p, i) => {
                                    if (i === index)
                                        return { x: p.x, y: value };
                                    return p;
                                });
                                setSelectedCollider({ ...selectedCollider, points });
                            }} />
                    </ControlGroup>
                ))}
            </div>
            <div style={{ marginTop: 10 }}>
                <Button
                    icon="tick"
                    intent="success"
                    onClick={() => setSelectedColliderID(undefined)}
                    style={{ marginRight: 5 }} />

                <Button
                    icon="trash"
                    intent="danger"
                    onClick={() => delCollider(selectedCollider)} />
            </div>
        </Card>
    )
}