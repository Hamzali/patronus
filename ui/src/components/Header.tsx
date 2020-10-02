import React, { FunctionComponent } from "react";

import { Link } from "react-router-dom";

import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
  },
  logo: {
    marginRight: theme.spacing(1),
    width: "45px",
  },
}));

const Header: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <Link to="/">
          <img alt="logo" src="/logo.png" className={classes.logo} />
        </Link>
        <Typography variant="h6">Patronus</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
