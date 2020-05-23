import React from "react";
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

import Avatar from "@material-ui/core/Avatar";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPhotoModal(props) {
  const [open, setOpen] = React.useState(props.openModalAddPhoto);
  const [previsualizarFoto, setPrevisualizarFoto] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [img, setImg] = React.useState("");
  const [porUrl, setPorUrl] = React.useState(true);

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

  return (
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
                    <AddPhotoAlternateIcon />
                  </Avatar>
                }
                title="Agregar fotos"
                subheader="Se permite formatos png,jpg, jpeg"
              />
              <CardContent>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid container>
                          <Grid item xs={12}>
                            <form
                              style={{ width: "100%" }}
                              validate="true"
                              onSubmit={event => props.insertFoto(img, title)}
                            >
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                color="secondary"
                                name="title"
                                label="Nombre de la imagen"
                                type="text"
                                id="title"
                                value={title}
                                onChange={e => {
                                  const { value } = e.target;
                                  // maybe more code here...
                                  setTitle(value);
                                }}
                              />
                              {porUrl ? (
                                <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  color="secondary"
                                  name="title"
                                  label="Enlace de la imagén"
                                  type="url"
                                  id="title"
                                  value={img}
                                  onChange={e => {
                                    const { value } = e.target;
                                    // maybe more code here...
                                    setImg(value);
                                  }}
                                />
                              ) : (
                                <React.Fragment>
                                  <input
                                    style={{ display: "none" }}
                                    // className={classes.input}
                                    id="portada"
                                    accept=".png,.jpg,.jpeg,.pdf"
                                    onChange={this.onChangeFilePortada.bind(
                                      this
                                    )}
                                    type="file"
                                  />
                                  <label htmlFor="portada">
                                    <IconButton
                                      aria-label="upload picture"
                                      component="span"
                                    >
                                      <AddPhotoAlternateIcon />
                                    </IconButton>
                                  </label>
                                </React.Fragment>
                              )}
                              <span
                                style={{
                                  color: porUrl === false ? "black" : "#9e9e9e"
                                }}
                              >
                                Por Archivo
                              </span>
                              <Switch
                                checked={porUrl}
                                onChange={() =>
                                  this.setState({ porUrl: !porUrl })
                                }
                                inputProps={{
                                  "aria-label": "secondary checkbox"
                                }}
                              />
                              <span
                                style={{
                                  color: porUrl ? "black" : "#9e9e9e"
                                }}
                              >
                                Por URL
                              </span>
                              <div
                                style={{
                                  textAlign: "right"
                                }}
                              >
                                <ButtonGroup
                                  color="secondary"
                                  aria-label="outlined secondary button group"
                                >
                                  <Button
                                    // type="submit"
                                    // variant="contained"
                                    // color="primary"
                                    // style={{ padding: "0.4%" }}
                                    onClick={() => setPrevisualizarFoto(true)}
                                  >
                                    <div
                                      style={{
                                        textTransform: "capitalize",
                                        fontSize: "70%"
                                      }}
                                    >
                                      Previsualizar foto
                                    </div>
                                  </Button>
                                  <Button
                                    type="submit"
                                    // variant="contained"
                                    // color="secondary"
                                    // style={{ padding: "0.4%" }}
                                  >
                                    <div
                                      style={{
                                        textTransform: "capitalize",
                                        fontSize: "70%"
                                      }}
                                    >
                                      Agregar foto!
                                    </div>
                                  </Button>
                                </ButtonGroup>
                              </div>
                            </form>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  {previsualizarFoto ? (
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardMedia
                          // className={classes.media}
                          style={{ height: 251 }}
                          image={img}
                          alt=""
                          title={title}
                        />
                      </Card>
                    </Grid>
                  ) : null}
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
      </DialogActions>
    </Dialog>
  );
}
