import { Button, ButtonGroup, Dialog } from "@blueprintjs/core";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useTranslation from "../../hooks/useTranslation";

export default function AgreementDialog(props: { isOpen: boolean, onAgree: () => void, onCancel: () => void }) {
    const settings = useSettingsValue();
    const translation = useTranslation();

    return (
        <>
            <Dialog
                isOpen={props.isOpen}
                onClose={props.onCancel}
                title={translation.LIAPIPolicy}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }} >
                    <p>
                        In order to abide by local laws and regulations as well as InnerSloth's <a href="https://www.innersloth.com/among-us-mod-policy/" target={"_blank"} rel="noreferrer">Among Us Mod Policy</a>,
                        you must agree upon a few rules before uploading...
                    </p>

                    <ol>
                        <li style={{ margin: 5 }}>
                            Maps cannot display anything that is offensive, grotesque, racist, sexist, vulgar, disparaging, or defamatory in any way.
                        </li>
                        <li style={{ margin: 5 }}>
                            Maps cannot add additional advertisements or monetization features.
                        </li>
                        <li style={{ margin: 5 }}>
                            Maps cannot state or suggest that your mod is official, licensed, or otherwise authorized by Innersloth.
                        </li>
                        <li style={{ margin: 5 }}>
                            Maps cannot be in a broken or unusable state at time of publish.
                        </li>
                        <li style={{ margin: 5 }}>
                            You cannot hack, flood, DoS, or break the LevelImposter API in any way.
                        </li>
                        <li style={{ margin: 5 }}>
                            You cannot redistribute maps or copyrighted materials that is not explicitly owned or licensed by you or InnerSloth.
                        </li>
                    </ol>

                    <p>
                        Both LevelImposter and InnerSloth reserve the right to modify or delete your map or account at any time for any reason.
                        <br /><br />
                        By pressing "I Agree", you are agreeing to abide by these rules and to be bound by the terms of the Among Us Mod Policy.
                        <br /><br />
                        A copy of these rules can be found at <a href="https://levelimposter.net/#/policy" target={"_blank"} rel="noreferrer">LevelImposter.net/#/Policy</a>
                    </p>

                    <ButtonGroup>

                        <Button
                            style={{ marginRight: 10 }}
                            onClick={props.onAgree}
                            text="I Agree"
                            intent="success"
                            icon="tick" />
                        <Button
                            onClick={props.onCancel}
                            text="Cancel"
                            intent="danger"
                            icon="cross" />

                    </ButtonGroup>
                </div>
            </Dialog>
        </>
    );
}