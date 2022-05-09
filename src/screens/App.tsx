import { Container } from '@mui/material';
import Canvas from './Canvas';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

export default function App() {
    return (
        <Container fixed>

            <LeftSidebar />
            <Canvas />
            <RightSidebar />

        </Container>
    );
}
