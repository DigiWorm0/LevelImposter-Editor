import {Box, Button, CircularProgress, Divider, List, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";
import React from "react";
import {Animation, Build, ContentCut, Gradient, Merge, Window} from "@mui/icons-material";
import BuildOperation from "../../../utils/build/BuildOperation";
import OptimizeMapOption from "./OptimizeMapOption";
import TrimMapAssetsOperation from "../../../utils/build/TrimMapAssetsOperation";
import MergeMapAssetsOperation from "../../../utils/build/MergeMapAssetsOperation";
import useOptimizeLog from "../../../hooks/optimize/useOptimizeLog";
import {Interweave} from "interweave";
import useAppendOptimizeLog from "../../../hooks/optimize/useAppendOptimizeLog";
import EncodeToDDSOperation from "../../../utils/build/EncodeToDDSOperation";
import useIsOptimizationRunning from "../../../hooks/optimize/useIsOptimizationRunning";
import ConvertToSpriteAnimOperation from "../../../utils/build/ConvertToSpriteAnimOperation";
import CreateSpriteSheetOperation from "../../../utils/build/CreateSpriteSheetOperation";
import useEnabledOptimizeOptionIDs from "../../../hooks/optimize/useEnabledOptimizeOptionIDs";

interface OptimizeMapOption {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    operation: BuildOperation;
}

const optimizeOptions: OptimizeMapOption[] = [
    {
        id: "trim-unused-assets",
        label: "Trim Unused Map Assets",
        description: "Removes any assets that do not have any map objects using them.",
        icon: <ContentCut/>,
        operation: TrimMapAssetsOperation
    },
    {
        id: "merge-duplicate-assets",
        label: "Merge Duplicate Map Assets",
        description: "Merges assets that are identical to reduce the total number of assets.",
        icon: <Merge/>,
        operation: MergeMapAssetsOperation
    },
    {
        id: "convert-to-dds",
        label: "Convert PNGs/JPEGs to DDS",
        description: "DDS assets use DXT1/DXT5 which can be decoded by the GPU directly instead of going through the CPU which improves memory usage and reduces game crashes.",
        icon: <Gradient/>,
        operation: EncodeToDDSOperation
    },
    {
        id: "convert-to-sprite-anim",
        label: "Convert GIFs to Sprite Animations",
        description: "Converts GIF files to Sprite Animations which are more efficient and have better performance.",
        icon: <Animation/>,
        operation: ConvertToSpriteAnimOperation
    },
    {
        id: "create-sprite-sheet",
        label: "Combine Map Assets to Sprite Sheet",
        description: "Combines multiple smaller sprites to a single larger sprite sheet to reduce file size and improve game performance.",
        icon: <Window/>,
        operation: CreateSpriteSheetOperation
    }
];

export default function OptimizeMapPanel() {
    const {t} = useTranslation();
    const [enabledIDs, setEnabledIDs] = useEnabledOptimizeOptionIDs();
    const [isRunning, setIsRunning] = useIsOptimizationRunning();
    const [optimizeLog, setOptimizeLog] = useOptimizeLog();
    const appendOptimizeLog = useAppendOptimizeLog();
    const bottomLogRef = React.useRef<HTMLDivElement>(null);

    const setOptionEnabled = React.useCallback((id: string, isEnabled: boolean) => {
        if (isEnabled)
            setEnabledIDs([...enabledIDs, id]);
        else
            setEnabledIDs(enabledIDs.filter(enabledID => enabledID !== id));
    }, [enabledIDs, setEnabledIDs]);

    const onOptimize = React.useCallback(async () => {
        // Mark as running
        setIsRunning(true);

        // Clear log
        setOptimizeLog([]);

        // Run selected operations
        const selectedOptions = optimizeOptions.filter(option => enabledIDs.includes(option.id));
        for (const selectedOption of selectedOptions) {
            try {
                // Log start
                appendOptimizeLog(`<span style="color: #1b91c8;">Start ►</span> ${selectedOption.label}`);

                // Run operation
                await selectedOption.operation.run();
            } catch (error) {
                // Log error
                console.error(error);
                appendOptimizeLog(`<span style="color: red;">Exception during ${selectedOption.label}:</span> ${(error as Error).message}`);
            }
        }

        // Log done
        appendOptimizeLog("<span style=\"color: #00c216;\">Done ✔</span>");

        // Mark as not running
        setIsRunning(false);
    }, [appendOptimizeLog, enabledIDs, setIsRunning, setOptimizeLog]);

    // On render, scroll to bottom of log
    React.useEffect(() => {
        if (bottomLogRef.current)
            bottomLogRef.current.scrollIntoView({behavior: "instant"});
    }, [optimizeLog]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                height: "60vh"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",

                    width: "50%",
                    maxHeight: "100%"
                }}
            >
                <List
                    dense
                    sx={{
                        flex: 1,
                        overflowY: "auto"
                    }}
                >
                    {optimizeOptions.map((option, index) => (
                        <OptimizeMapOption
                            key={index}
                            enabled={enabledIDs.includes(option.id)}
                            setEnabled={(isEnabled: boolean) => setOptionEnabled(option.id, isEnabled)}
                            label={option.label}
                            description={option.description}
                            icon={option.icon}
                        />
                    ))}
                </List>

                <Divider sx={{mb: 1}}/>
                <Button
                    variant={"contained"}
                    size={"small"}
                    onClick={onOptimize}
                    fullWidth
                    disabled={isRunning || optimizeOptions.every(option => !enabledIDs.includes(option.id))}
                >
                    {isRunning ?
                        <CircularProgress size={20} color={"inherit"} sx={{mr: 1}}/> :
                        <Build sx={{mr: 1}}/>
                    }
                    {t("map.optimize")}
                </Button>
            </Box>

            <Paper
                sx={{
                    flex: 1,
                    m: 2,
                    p: 2,
                    fontFamily: "monospace",
                    overflow: "auto"
                }}
                elevation={0}
            >
                <code>
                    <Interweave
                        content={optimizeLog.join("<br/>")}
                        style={{display: "block"}}
                    />
                    <div ref={bottomLogRef}/>
                    {/* Dummy div to scroll to bottom */}
                </code>
            </Paper>
        </Box>
    );
}