import { Grid } from "@mui/material";
import React from "react";

export function StyledTabs() {
    return (
        <Grid
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: "-1",
            }}
            container
        >
            <Grid item></Grid>
            <Grid item style={{ position: "absolute", bottom: 0 }}>
                <img src={process.env.PUBLIC_URL + "/Blink/StolenSVG1.svg"} />
            </Grid>
            <Grid item style={{ position: "absolute", top: 0, right: 0 }}>
                <img src={process.env.PUBLIC_URL + "/Blink/StolenSVG2.svg"} />
            </Grid>
        </Grid>
    );
}

export default StyledTabs;
