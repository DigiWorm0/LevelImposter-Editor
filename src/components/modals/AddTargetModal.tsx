import React from "react";
import {useTranslation} from "react-i18next";
import {Alert, Button} from "@mui/material";
import GenericModal from "./GenericModal";
import ElementSelect from "../properties/input/select/ElementSelect";
import useSelectedElemProp from "../../hooks/elements/useSelectedElemProperty";
import useAddAnimTarget from "../../hooks/timeline/useAddAnimTarget";
import {MaybeGUID} from "../../types/generic/GUID";
import {Add} from "@mui/icons-material";
import {useSettingsValue} from "../../hooks/useSettings";

export interface AddTargetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTargetModal(props: AddTargetModalProps) {
    const {t} = useTranslation();
    const settings = useSettingsValue();
    const [selectedID, setSelectedID] = React.useState<MaybeGUID>(undefined);
    const [animTargets,] = useSelectedElemProp("animTargets");
    const addAnimTarget = useAddAnimTarget();

    const onAddTarget = () => {
        if (!selectedID)
            return;

        addAnimTarget(selectedID);
        props.onClose();
    };

    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
            title={t("anim.selectTarget") as string}
            actions={(<>
                <Button
                    variant={"contained"}
                    onClick={onAddTarget}
                    color="success"
                    disabled={!selectedID || animTargets?.some((t) => t.id === selectedID)}
                >
                    <Add/>
                    {t("anim.addTarget") as string}
                </Button>
            </>
            )}
        >
            <ElementSelect
                disablePortal={false}
                typeFilter={settings.animAnything ? undefined : "util-blanktrigger"}
                noElementsText={t("anim.noTargets")}
                defaultText={t("anim.selectTarget")}
                selectedID={selectedID}
                onPick={(elem) => setSelectedID(elem.id)}
                blacklistedIDs={animTargets?.map((t) => t.id)}
                placement={"top"}
                onReset={() => setSelectedID(undefined)}
            />

            {!settings.animAnything && (
                <Alert severity={"info"}>
                    {t("anim.addTargetInfo")}
                </Alert>
            )}
        </GenericModal>
    );
}