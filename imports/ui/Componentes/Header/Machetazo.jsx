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
  /*
    Querido colega programador:
    Cuando escribí este código, sólo Dios y yo sabíamos cómo funcionaba (por eso el nombre "Machetazo").
    Ahora, solo Dios lo sabe!
    Así que si está tratando de 'optimizarlo' y fracasa (seguramente), por favor,
    incremente el contador a continuación
    como una advertencia para su siguiente colega:

    WARNING   total horas perdidas aquí = 3

    */
  return <div className={classes.offset} />;
}
