import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Box";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function StyledTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default StyledTabPanel;