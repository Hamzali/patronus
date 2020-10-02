import React, { FunctionComponent, ReactElement } from "react";
import { Grid, Container, makeStyles } from "@material-ui/core";
import Header from "./components/Header";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    backgroundColor: theme.palette.customBgColor,
  },
  innerContainer: {
    flex: 1,
  },
}));

export interface LayoutProps {
  children: ReactElement;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.container}
      container
      direction="column"
      alignItems="center"
    >
      <Header />
      <Container className={classes.innerContainer}>
        {children}
      </Container>
    </Grid>
  );
};

export default Layout;
