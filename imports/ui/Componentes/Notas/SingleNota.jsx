import React from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import swal from "sweetalert";

export default function SingleNota(props) {
  const borrarNota = () => {
    swal({
      title: "¿Esta seguro que desea borrar la nota?",
      text: "Si la borras no podras recuperarla.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Cancelar", "Borrar"]
    }).then(willDelete => {
      if (willDelete) {
        Meteor.call("deleteNota", { _id: props.nota._id }, err => {
          if (err) {
            console.log(err);
            swal("Error borrando la nota", {
              icon: "warning"
            });
          } else {
            swal({
              title: "Nota borrada!",
              icon: "success"
            });
            props.obtenerNotas();
          }
        });
      } else {
        swal({ title: "Borrado de venta cancelada.", icon: "success" });
      }
    });
  };

  return (
    <div>
      <Card variant="outlined">
        <CardHeader
          title={
            <Grid container>
              <Grid item xs={8} md={9}>
                <Typography
                  style={{ textTransform: "capitalize" }}
                  color="textSecondary"
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  {props.nota.titulo}
                </Typography>
              </Grid>
              <Grid item xs={4} md={3}>
                <div style={{ textAlign: "right" }}>
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => borrarNota()}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            <div
              dangerouslySetInnerHTML={{
                __html: props.nota.descripcion
              }}
            />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
