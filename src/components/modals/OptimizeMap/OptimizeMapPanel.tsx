import {Button, CircularProgress, Divider, Grid, List, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";
import React from "react";
import {Build, ContentCut, Merge, Schema} from "@mui/icons-material";
import BuildOperation from "../../../utils/build/BuildOperation";
import OptimizeMapOption from "./OptimizeMapOption";
import TrimMapAssetsOperation from "../../../utils/build/TrimMapAssetsOperation";
import MergeMapAssetsOperation from "../../../utils/build/MergeMapAssetsOperation";
import useOptimizeLog from "../../../hooks/optimize/useOptimizeLog";
import {Interweave} from "interweave";
import useAppendOptimizeLog from "../../../hooks/optimize/useAppendOptimizeLog";
import EncodeToDDSOperation from "../../../utils/build/EncodeToDDSOperation";
import useIsOptimizationRunning from "../../../hooks/optimize/useIsOptimizationRunning";

interface OptimizeMapOption {
    label: string;
    description?: string;
    icon?: React.ReactNode;
    operation: BuildOperation;
    isEnabled: boolean;
}

const DEFAULT_OPTIONS: OptimizeMapOption[] = [
    {
        label: "Trim Unused Map Assets",
        description: "Removes any assets that do not have any map objects using them.",
        icon: <ContentCut/>,
        operation: TrimMapAssetsOperation,
        isEnabled: true
    },
    {
        label: "Merge Duplicate Map Assets",
        description: "Merges assets that are identical to reduce the total number of assets.",
        icon: <Merge/>,
        operation: MergeMapAssetsOperation,
        isEnabled: true
    },
    {
        label: "Convert Map Assets to DDS (DXT1 / DXT5)",
        description: "DXT1/DXT5 allows assets to be decoded by the GPU instead of the CPU, improving CPU memory usage.",
        icon: <Schema/>,
        operation: EncodeToDDSOperation,
        isEnabled: true,
    }
];

export default function OptimizeMapPanel() {
    const {t} = useTranslation();
    const [optimizeOptions, setOptimizeOptions] = React.useState<OptimizeMapOption[]>(DEFAULT_OPTIONS);
    const [isRunning, setIsRunning] = useIsOptimizationRunning();
    const [optimizeLog, setOptimizeLog] = useOptimizeLog();
    const appendOptimizeLog = useAppendOptimizeLog();
    const bottomLogRef = React.useRef<HTMLDivElement>(null);

    const setOptionEnabled = React.useCallback((index: number, isEnabled: boolean) => {
        setOptimizeOptions((prev) => {
            const newOptions = [...prev];
            newOptions[index] = {
                ...newOptions[index],
                isEnabled
            };
            return newOptions;
        });
    }, []);

    const onOptimize = React.useCallback(async () => {
        // Mark as running
        setIsRunning(true);

        // Clear log
        setOptimizeLog([]);

        // Run selected operations
        const selectedOptions = optimizeOptions.filter(option => option.isEnabled);
        for (const selectedOption of selectedOptions) {
            try {
                // Log start
                appendOptimizeLog(`<span style="color: #1b91c8;">Start ►</span> ${selectedOption.label}`);

                // Run operation
                await selectedOption.operation.run();
            } catch (error) {
                // Log error
                appendOptimizeLog(`<span style="color: red;">Exception during ${selectedOption.label}:</span> ${(error as Error).message}`);
            }
        }

        // Log done
        appendOptimizeLog("<span style=\"color: #00c216;\">Done ✔</span>");

        // Mark as not running
        setIsRunning(false);
    }, [optimizeOptions]);

    // On render, scroll to bottom of log
    React.useEffect(() => {
        if (bottomLogRef.current)
            bottomLogRef.current.scrollIntoView({behavior: "smooth"});
    }, [optimizeLog]);

    return (
        <Grid container>
            <Grid size={6}>
                <List dense>
                    {optimizeOptions.map((option, index) => (
                        <OptimizeMapOption
                            key={index}
                            enabled={option.isEnabled}
                            setEnabled={(isEnabled: boolean) => setOptionEnabled(index, isEnabled)}
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
                    disabled={isRunning || optimizeOptions.every(option => !option.isEnabled)}
                >
                    {isRunning ?
                        <CircularProgress size={20} color={"inherit"} sx={{mr: 1}}/> :
                        <Build sx={{mr: 1}}/>
                    }
                    {t("map.optimize")}
                </Button>
            </Grid>

            <Grid
                size={6}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch"
                }}
            >
                <Paper
                    sx={{
                        m: 2,
                        p: 2,
                        fontFamily: "monospace",
                        overflow: "auto",
                        flexGrow: 1,
                        minHeight: 300,
                        maxHeight: 300,
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
            </Grid>
        </Grid>
    );
}