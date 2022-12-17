import { Grid } from "@mui/material";
import React from "react";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import { makeStyles, withStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    Tab: {
        padding: "1rem 0 1rem 1rem",
    },
    TabTitle: {
        textTransform: "none",
        textAlign: "left",
        color: "black",
    },
    TabSubTitle: {
        textTransform: "none",
    },
}));
const CustomTab = withStyles({
    root: {
        backgroundColor: "orange",
        "&.Mui-selected": {
            background: "#f4f4f4",
        },
    },
    selected: {
        backgroundColor: "purple",
    },
})(MuiTab);

export type Tab = {
    title: string;
    subtitle: string | JSX.Element;
};

export function StyledTabs({
   tabs,
   setTabIndex,
   tabIndex,
}: {
    tabs: Tab[];
    setTabIndex: (index: number) => void;
    tabIndex: number;
}) {
    const classes = useStyles();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <MuiTabs
            orientation="vertical"
            variant="scrollable"
            value={tabIndex}
            onChange={handleChange}
            aria-label="Vertical tabs"
            TabIndicatorProps={{ style: { background: "#f4f4f4" } }}
        >
            {tabs.map((tab: Tab, index: number) => (
                <CustomTab
                    disableRipple={true}
                    label={
                        <Grid
                            container
                            className={classes.Tab}
                            flexDirection="column"
                            direction="column"
                            alignItems="flex-start"
                            xs={12}
                        >
                            <Grid item className={classes.TabTitle} xs={12}>
                                {tab.title}
                            </Grid>
                            <Grid
                                item
                                className={classes.TabSubTitle}
                                xs={12}
                                style={{ width: "100%", fontSize: 10 }}
                            >
                                {tab.subtitle}
                            </Grid>
                        </Grid>
                    }
                    data-testid={`tab-${index}`}
                />
            ))}
        </MuiTabs>
    );
}

export default StyledTabs;
