import React, { FunctionComponent } from "react";
import { CircularProgress, Grid } from "@material-ui/core";

const LoaderScreen: FunctionComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  );
};

export default LoaderScreen;
