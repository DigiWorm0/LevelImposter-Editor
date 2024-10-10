import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import ElementSelect from "../input/select/ElementSelect";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import {Collapse, MenuItem, Select} from "@mui/material";

export default function ComparatorPanel() {
    const {t} = useTranslation();
    const isComparator = useIsSelectedElemType("util-valuecomparator");
    const [valueID1, setValueID1] = useSelectedElemProp("comparatorValueID1");
    const [valueID2, setValueID2] = useSelectedElemProp("comparatorValueID2");
    const [operation, _setOperation] = useSelectedElemProp("comparatorOperation");

    const setOperation = (op: string) => {
        if (op === "not" && valueID2)
            setValueID2(undefined);
        _setOperation(op);
    };

    if (!isComparator)
        return null;

    return (
        <PanelContainer title={t("comparator.title") as string}>
            <ElementSelect
                label={t("comparator.value1")}
                typeFilter={"util-value"}
                noElementsText={t("comparator.noValues")}
                defaultText={t("comparator.selectValue")}
                selectedID={valueID1}
                onPick={(elem) => setValueID1(elem.id)}
                onReset={() => setValueID1(undefined)}
                blacklistedIDs={[valueID2]}
            />

            <Select
                fullWidth
                size={"small"}
                variant={"outlined"}
                value={operation ?? "and"}
                onChange={(e) => setOperation(e.target.value as string)}
                style={{marginTop: 5, marginBottom: 5}}
            >
                <MenuItem value={"and"}>{t("comparator.and")}</MenuItem>
                <MenuItem value={"or"}>{t("comparator.or")}</MenuItem>
                <MenuItem value={"xor"}>{t("comparator.xor")}</MenuItem>
                <MenuItem value={"not"}>{t("comparator.not")}</MenuItem>
            </Select>

            <Collapse in={operation !== "not"}>
                <ElementSelect
                    label={t("comparator.value2")}
                    typeFilter={"util-value"}
                    noElementsText={t("comparator.noValues")}
                    defaultText={t("comparator.selectValue")}
                    selectedID={valueID2}
                    onPick={(elem) => setValueID2(elem.id)}
                    onReset={() => setValueID2(undefined)}
                    blacklistedIDs={[valueID1]}
                />
            </Collapse>
        </PanelContainer>
    );
}
