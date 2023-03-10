"use client";
import { Grid, Typography } from "@mui/material";

const pages = () => {
  return (
    <Grid component="main" container direction="row" height="100%">
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#ffd400",
          height: "5%",
        }}
        justifyContent="center"
      >
        <Typography textAlign="center" mt={2}>
          Se inicio sesion
        </Typography>
      </Grid>
    </Grid>
  );
};

export default pages;
