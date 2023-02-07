import { Provider } from 'jotai';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CheckMobile from '../components/dialogs/CheckMobile';
import MapHelmet from '../components/utils/MapHelmet';
import useAutoSave from '../hooks/useAutoSave';
import { useSettingsValue } from '../hooks/jotai/useSettings';
import useCombos from '../hooks/useCombos';
import useEmbed from '../hooks/useEmbed';
import useIDParam from '../hooks/useIDParam';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar';
import OpenInEditor from './OpenInEditor';
import RightSidebar from './RightSidebar';
import Topbar from './Topbar';
import primaryStore from '../hooks/jotai/primaryStore';

export default function App() {
    const { i18n } = useTranslation();
    const settings = useSettingsValue();
    const isEmbeded = useEmbed();
    useCombos();
    useIDParam();
    useAutoSave();

    React.useEffect(() => {
        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        if (!isEmbeded)
            window.addEventListener("beforeunload", onBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
        }
    }, [isEmbeded]);

    React.useEffect(() => {
        if (settings.language === "auto")
            i18n.changeLanguage(navigator.language);
        else
            i18n.changeLanguage(settings.language);
    }, [settings.language]);

    return (
        <div
            className={"app" + (settings.isDarkMode === false ? "" : " bp4-dark")}>

            <Provider store={primaryStore}>
                {!isEmbeded && (<>
                    <MapHelmet />
                    <Topbar />
                    <LeftSidebar />
                </>)}

                <Canvas />

                {!isEmbeded && (<>
                    <RightSidebar />
                    <CheckMobile />
                </>)}

                {isEmbeded && (<>
                    <OpenInEditor />
                </>)}
            </Provider>
        </div>
    );
}
