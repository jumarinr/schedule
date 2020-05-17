import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1
  }
}));

export default function AppBarOffset() {
  const classes = useStyles();
  return <div className={classes.offset} />;
}
