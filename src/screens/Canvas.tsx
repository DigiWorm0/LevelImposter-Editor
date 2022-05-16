import { Box } from '@mui/system';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import MapElement from '../components/canvas/MapElement';
import useCamera from '../hooks/useCamera';
import useMap from '../hooks/useMap';

export default function Canvas() {
    const [map] = useMap();
    const camera = useCamera();

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: "hidden",
            }}>

            <Stage
                width={window.innerWidth}
                height={window.innerHeight}>
                <Layer
                    x={camera.x}
                    y={camera.y}
                    scale={{ x: camera.z, y: camera.z }}>

                    {map.elementIDs.map(elementID => (
                        <MapElement key={elementID} elementID={elementID} />
                    ))}
                </Layer>
            </Stage>


        </Box>

    );
}