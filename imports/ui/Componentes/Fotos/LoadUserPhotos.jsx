import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
// import tileData from './tileData';

export default function ImageGridList(props) {
  const [fotos, setFotos] = React.useState([]);
  // const classes = useStyles();
  React.useEffect(() => {
    // Pass in a callback function!
    // obtenerListado(props.grupoDeFotos);
    setFotos(props.fotos);
  }, [props.fotos]);

  return fotos.map((item, key) => {
    return (
      <Grid item xs={12} md={4} key={key}>
        <Card>
          <CardMedia
            // className={classes.media}
            style={{ height: 251 }}
            image={item.img}
            title={item.title}
          />
        </Card>
      </Grid>
    );
  });
}
