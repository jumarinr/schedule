import React from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

import Header from "../Header/Header.jsx";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PerfilStyle from "../../Estilos/Perfil/PerfilStyle.jsx";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import TooltipTrigger from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import AppBarOffset from "../Header/Machetazo.jsx";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import LinearProgress from "@material-ui/core/LinearProgress";

const Tooltip = ({ children, tooltip, hideArrow, ...props }) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement
    }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: "tooltip-container"
        })}
      >
        {!hideArrow && (
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: "tooltip-arrow",
              "data-placement": placement
            })}
          />
        )}
        {tooltip}
      </div>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: "trigger"
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      agregarDescripcion: false,
      description: "",
      anchorEl: null,
      openError: false,
      openSuccess: false,
      msgError: "",
      msgSuccess: "",
      editarPerfil: false,
      loadingInfo: true,
      editorHtml: "",
      theme: "snow"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    Meteor.call("findUserById", (err, result) => {
      if (err) {
        console.error(err);
        this.setState({
          loadingInfo: false,
          msgError: "Error fatal",
          openError: true
        });
      } else {
        this.cargarDescripcion(result.description);
        this.setState({ userData: result, loadingInfo: false });
      }
    });
  }
  handleChange(html) {
    this.setState({ editorHtml: html, editarPerfil: true });
  }

  cargarDescripcion(description) {
    if (!description.includes("<")) {
      this.setState({ editorHtml: `<p>${description}</p>` });
    } else {
      this.setState({ editorHtml: description });
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  // funcion para validar el tipo y el tamaño de los archivos cargados desde el fileinput
  onChangeFilePortada(e) {
    // extraigo las propiedades del inputfile
    const input = document.getElementById("portada");

    // Lista de formatos de archivos para ser adjuntados
    const formatos = ["image/png", "image/jpeg", "image/jpg"];

    // ciclo para recorrer los archivos y extraer sus propiedades
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      if (!formatos.includes(input.files[0].type)) {
        this.setState({
          msgError: "Solo podra cargar imagenes",
          openError: true
        });
        console.error("Solo podra cargar imagenes");
      } else {
        // Si cumple con las condiciones, inserto el archivo en file y filename
        // convierte el archivo a base64
        reader.readAsDataURL(input.files[0]);
        // inserto en files el archivo en base64
        reader.onload = function(e) {
          const userData = this.state.userData;
          userData.portada = e.target.result;
          this.setState({ userData, editarPerfil: true });
        }.bind(this);
      }
    }
  }
  onChangeFileProfilePic(e) {
    // extraigo las propiedades del inputfile
    const input = document.getElementById("profilePic");

    // Lista de formatos de archivos para ser adjuntados
    const formatos = ["image/png", "image/jpeg", "image/jpg"];

    // ciclo para recorrer los archivos y extraer sus propiedades
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      if (!formatos.includes(input.files[0].type)) {
        this.setState({ MsgError: "Solo podra cargar imagenes" });
        console.error("Solo podra cargar imagenes");
      } else {
        // Si cumple con las condiciones, inserto el archivo en file y filename
        // convierte el archivo a base64
        reader.readAsDataURL(input.files[0]);
        // inserto en files el archivo en base64
        reader.onload = function(e) {
          const userData = this.state.userData;
          userData.profilePic = e.target.result;
          this.setState({ userData, anchorEl: null, editarPerfil: true });
        }.bind(this);
      }
    }
  }
  editPerfil() {
    const { userData, editorHtml } = this.state;

    if (editorHtml) {
      userData.description = editorHtml;
    }
    Meteor.call("updateUser", { userData }, (err, result) => {
      if (err) {
        console.error(err);
        this.setState({
          msgError: "error al editar el usuario",
          openError: true,
          editPerfil: true
        });
      } else {
        this.setState({
          msgSuccess: "Usuario editado con éxito!",
          openSuccess: true,
          agregarDescripcion: false,
          userData: result,
          editPerfil: false
        });
      }
    });
  }
  render() {
    const {
      userData,
      description,
      anchorEl,
      editarPerfil,
      loadingInfo
    } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <AppBarOffset />
        <AppBarOffset />
        {userData && userData._id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card // className={classes.root}
              >
                <CardMedia
                  className={classes.media}
                  image={
                    userData.portada ||
                    "https://ichef.bbci.co.uk/images/ic/720x405/p08bdwzk.jpg"
                  }
                  title="Random photo of hubble"
                />
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <div style={{ textAlign: "right" }}>
                        <Tooltip placement="left" tooltip="Cambiar Portada">
                          <input
                            style={{ display: "none" }}
                            // className={classes.input}
                            id="portada"
                            accept=".png,.jpg,.jpeg,.pdf"
                            onChange={this.onChangeFilePortada.bind(this)}
                            type="file"
                          />
                          <label htmlFor="portada">
                            <IconButton
                              aria-label="upload picture"
                              component="span"
                            >
                              <AddAPhotoIcon />
                            </IconButton>
                          </label>
                        </Tooltip>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ textAlign: "center" }}>
                        <IconButton onClick={event => this.handleClick(event)}>
                          {userData.profilePic ? (
                            <Avatar
                              alt=""
                              src={userData.profilePic}
                              className={classes.large}
                            />
                          ) : (
                            <Avatar className={classes.large}>
                              {userData.profile.name[0]}
                            </Avatar>
                          )}
                        </IconButton>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={() => this.handleClose()}
                        >
                          <MenuItem disabled={!userData.profilePic}>
                            <PageviewIcon style={{ color: "#00b0ff" }} /> &nbsp;
                            Ver foto
                          </MenuItem>
                          <MenuItem>
                            <input
                              style={{ display: "none" }}
                              // className={classes.input}
                              id="profilePic"
                              accept=".png,.jpg,.jpeg,.pdf"
                              onChange={this.onChangeFileProfilePic.bind(this)}
                              type="file"
                            />
                            <label
                              htmlFor="profilePic"
                              style={{ fontSize: "medium" }}
                            >
                              <IconButton size="small">
                                <AddAPhotoIcon style={{ color: "#00b0ff" }} />
                              </IconButton>
                              &nbsp; Cambiar foto
                            </label>
                          </MenuItem>
                          <MenuItem onClick={() => Meteor.logout()}>
                            <DeleteIcon style={{ color: "#00b0ff" }} />
                            &nbsp; Eliminar foto
                          </MenuItem>
                        </Menu>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="h5" component="h2">
                        <div style={{ textAlign: "center" }}>
                          {" "}
                          {userData.profile.name}
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {this.state.agregarDescripcion ? (
                          <div>
                            {/*
                              <TextField
                                id="outlined-multiline-static"
                                label="Algo sobre ti"
                                multiline
                                color="secondary"
                                fullWidth
                                rows={4}
                                variant="outlined"
                                value={description}
                                onChange={event =>
                                  this.setState({
                                    description: event.target.value,
                                    editarPerfil: true
                                  })
                                }
                              />
                              */}
                            <ReactQuill
                              theme={this.state.theme}
                              onChange={this.handleChange}
                              value={this.state.editorHtml}
                              modules={Perfil.modules}
                              formats={Perfil.formats}
                              bounds={".app"}
                              placeholder={"Algo sobre ti"}
                            />
                            <Button
                              color="secondary"
                              simple
                              size="small"
                              onClick={() =>
                                this.setState({ agregarDescripcion: false })
                              }
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : userData.description ? (
                          <span>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: userData.description
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() =>
                                this.setState({
                                  agregarDescripcion: true,
                                  description: userData.description
                                })
                              }
                            >
                              <EditIcon style={{ color: "#1565c0" }} />
                            </IconButton>
                          </span>
                        ) : (
                          <Button
                            simple="true"
                            color="inherit"
                            onClick={() =>
                              this.setState({ agregarDescripcion: true })
                            }
                          >
                            Agregar una breve descripción
                          </Button>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  {editarPerfil ? (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => this.editPerfil()}
                    >
                      Editar Perfil
                    </Button>
                  ) : null}
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ) : loadingInfo ? (
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <div style={{ textAlign: "center" }}>
                        Cargando la información...
                      </div>
                    </Grid>
                    <hr />
                    <Grid item xs={12}>
                      <LinearProgress color="secondary" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : null}
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
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSuccess}
          autoHideDuration={6000}
          onClose={() => this.setState({ openSuccess: false })}
        >
          <SnackbarContent
            style={{
              backgroundColor: "#004d40"
            }}
            message={this.state.msgSuccess}
            action={[
              <IconButton
                key={1}
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => this.setState({ openSuccess: false })}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

Perfil.modules = {
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
 * Quill Perfil formats
 * See https://quilljs.com/docs/formats/
 */
Perfil.formats = [
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

export default withStyles(PerfilStyle)(Perfil);
