import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
    contentGrid: {
        padding: "5rem",
        flexFlow: "column",
        overflow: "auto",
    },
}));

/**
 * Grid system for spacing content consistently for every page
 * Expects a list of children as <Grid> items
 */
export function Layout({ children }:{children:React.ReactNode}) {
    const classes = useStyles();
    return (
        <Grid container className={classes.contentGrid} spacing={5}>
            {children}
        </Grid>
    );
}

export default Layout;
