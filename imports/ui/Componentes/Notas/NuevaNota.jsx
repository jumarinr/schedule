import React from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Switch from "@material-ui/core/Switch";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";

import Avatar from "@material-ui/core/Avatar";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NuevaNota(props) {
  const [open, setOpen] = React.useState(props.openModalAddPhoto);
  const [previsualizarFoto, setPrevisualizarFoto] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [img, setImg] = React.useState("");
  const [porUrl, setPorUrl] = React.useState(true);
  const [nota, setNota] = React.useState("");
  const [titulo, setTitulo] = React.useState("");
  const [theme] = React.useState("snow");
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [msgSuccess, setMsgSuccess] = React.useState("");

  React.useEffect(() => {
    // Pass in a callback function!
    setOpen(props.openModalAddPhoto);
  }, [props.openModalAddPhoto]);
  const handleClickOpen = () => {
    setOpen(true);
    props.handleOpenModalAddPhoto();
  };

  const handleClose = () => {
    setOpen(false);
    props.handleOpenModalAddPhoto();
  };

  const handleChange = event => {
    setNota(event);
  };

  const addNote = () => {
    Meteor.call("addNote", { titulo, descripcion: nota }, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        setTitulo("");
        setNota("");
        setMsgSuccess("Nota creada con éxito!");
        setOpenSuccess(true);
        handleClose();
        props.obtenerNotas();
      }
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar
                    // className={classes.large}
                    >
                      <FontAwesomeIcon icon={faStickyNote} size="lg" />
                    </Avatar>
                  }
                  title={
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
                  }
                />
                <CardContent>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <form validate="true" autoComplete="on">
                        <ReactQuill
                          theme={theme}
                          onChange={handleChange}
                          value={nota}
                          modules={NuevaNota.modules}
                          formats={NuevaNota.formats}
                          bounds={".app"}
                          placeholder={"Texto de una nota va aquí"}
                        />
                      </form>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button
            onClick={addNote}
            color="primary"
            disabled={!titulo || (!nota || nota === "<p><br></p>")}
          >
            Insertar Nota!
          </Button>
        </DialogActions>
      </Dialog>
      {/*
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.openError}
        autoHideDuration={6000}
        onClose={() => this.setState({ openError: false })}
      >
        <SnackbarContent
          style={{
            backgroundColor: "red"
          }}
          message={this.state.msgError}
          action={[
            <IconButton
              key={1}
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => this.setState({ openError: false })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ]}
        />
      </Snackbar> */}

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#004d40"
          }}
          message={msgSuccess}
          action={[
            <IconButton
              key={1}
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpenSuccess(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ]}
        />
      </Snackbar>
    </div>
  );
}

NuevaNota.modules = {
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
 * Quill NuevaNota formats
 * See https://quilljs.com/docs/formats/
 */
NuevaNota.formats = [
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
