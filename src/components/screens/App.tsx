import { Provider as StateProvider } from 'jotai';
import primaryStore from '../../hooks/primaryStore';
import Content from './Content';
import { HotkeysProvider } from "react-hotkeys-hook";

export default function App() {

    return (
        <StateProvider store={primaryStore}>
            <HotkeysProvider>
                <Content />
            </HotkeysProvider>
        </StateProvider>
    );
}
