import React from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import swal from "sweetalert";

export default function SingleNota(props) {
  const [titulo, setTitulo] = React.useState(props.nota.titulo);
  const [descripcion, setDescripcion] = React.useState(props.nota.descripcion);
  const [editText, setEditText] = React.useState(false);
  const [theme] = React.useState("snow");

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
            console.error(err);
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
        swal({ title: "Cancelado", icon: "success" });
      }
    });
  };

  const editNota = () => {
    Meteor.call(
      "editNota",
      { _id: props.nota._id, descripcion, titulo },
      (err, result) => {
        if (err) {
          console.error(err);
          swal({
            title: "Error editando la nota, vuelve a intentar por favor",
            icon: "error"
          });
        } else {
          swal({ title: "Nota editada con éxito", icon: "success" });
          setEditText(false);
          props.obtenerNotas();
        }
      }
    );
  };
  const handleChange = event => {
    setDescripcion(event);
  };
  return (
    <div>
      <Card variant="outlined">
        <CardHeader
          title={
            editText ? (
              <form validate="true" autoComplete="on">
                <TextField
                  color="secondary"
                  fullWidth
                  id="titulo"
                  required
                  value={titulo}
                  onChange={event => setTitulo(event.target.value)}
                  label="Agregar tu titulo!"
                />
              </form>
            ) : (
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
                    <IconButton size="small" onClick={() => setEditText(true)}>
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
            )
          }
        />
        <CardContent>
          {editText ? (
            <form validate="true" autoComplete="on">
              <ReactQuill
                theme={theme}
                onChange={handleChange}
                value={descripcion}
                modules={SingleNota.modules}
                formats={SingleNota.formats}
                bounds={".app"}
                placeholder={"Texto de una nota va aquí"}
              />
            </form>
          ) : (
            <Typography variant="body2" color="textSecondary" component="span">
              <div
                dangerouslySetInnerHTML={{
                  __html: props.nota.descripcion
                }}
              />
            </Typography>
          )}
        </CardContent>
        {editText ? (
          <CardActions>
            <div style={{ textAlign: "right !important" }}>
              <Button
                simple="true"
                color="secondary"
                size="small"
                onClick={() => setEditText(false)}
              >
                Cancelar
              </Button>
              <Button
                simple="true"
                color="secondary"
                size="small"
                onClick={() => editNota()}
                disabled={
                  !titulo || (!descripcion || descripcion === "<p><br></p>")
                }
              >
                Aceptar
              </Button>
            </div>
          </CardActions>
        ) : null}
      </Card>
    </div>
  );
}

SingleNota.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill SingleNota formats
 * See https://quilljs.com/docs/formats/
 */
SingleNota.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];
