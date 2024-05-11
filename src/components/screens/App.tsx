import { Provider } from 'jotai';
import primaryStore from '../../hooks/primaryStore';
import Content from './Content';

export default function App() {

    return (
        <Provider store={primaryStore}>
            <Content />
        </Provider>
    );
}
