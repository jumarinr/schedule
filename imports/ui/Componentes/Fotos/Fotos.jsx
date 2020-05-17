import React from "react";
import Header from "../Header/Header.jsx";
import AppBarOffset from "../Header/Machetazo.jsx";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import CardMedia from "@material-ui/core/CardMedia";
import CargarArrayFotos from "./CargarArrayFotos";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import UpdateIcon from "@material-ui/icons/Update";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Fotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fotos: [],
      title: "",
      img: "",
      porUrl: true,
      previsualizarFoto: false,
      hubbleImages: false,
      loadingHubble: false
    };
  }
  componentDidMount() {
    this.actualizarListadoFotos();
  }
  actualizarListadoFotos() {
    Meteor.call("actualizarListadoFotos", (err, result) => {
      if (err) {
        console.error();
      } else {
        this.setState({
          fotos: result.fotos
        });
      }
    });
  }
  getHubbleRecomendations() {
    this.setState({ loadingHubble: true });
    Meteor.call("getHubbleRecomendations", (err, result) => {
      if (err) {
        console.error(err);
        this.setState({ loadingHubble: false });
      } else {
        this.setState({
          fotos: result,
          loadingHubble: false,
          hubbleImages: true
        });
      }
    });
  }
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
  insertFoto(event) {
    event.preventDefault();
    const { title, img } = this.state;
    Meteor.call("insertFotoByUser", { title, img }, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        this.setState({
          title: "",
          img: "",
          previsualizarCancion: false
        });
        this.actualizarListadoCanciones();
      }
    });
  }

  render() {
    const { classes } = this.props;
    const {
      fotos,
      title,
      img,
      porUrl,
      previsualizarFoto,
      hubbleImages,
      loadingHubble
    } = this.state;
    return (
      <div>
        <Header component="Fotos" />

        <AppBarOffset />
        <AppBarOffset />
        <div style={{ float: "right" }}>
          <Button
            simple="true"
            color="secondary"
            onClick={() => this.getHubbleRecomendations()}
            disabled={loadingHubble}
          >
            {loadingHubble ? (
              <React.Fragment>
                <CircularProgress color="secondary" /> &nbsp; Cargando
                listado...
              </React.Fragment>
            ) : (
              <React.Fragment>
                <UpdateIcon /> &nbsp;
                {hubbleImages
                  ? "Actualizar imagenes"
                  : "Obtener imagenes al azar"}
              </React.Fragment>
            )}
          </Button>
        </div>
        <br />
        {loadingHubble ? (
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <div style={{ textAlign: "center" }}>
                        Cargando imagenes del Hubble en tiempo real!
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
        ) : (
          <Grid container justify="center" alignItems="center" spacing={2}>
            {hubbleImages && fotos.length > 0 ? (
              <Grid item xs={12}>
                <Grid container>
                  {fotos.map((grupoDeFotos, key) => {
                    return (
                      <Grid item xs={12} md={4} key={key}>
                        <CargarArrayFotos
                          grupoDeFotos={{
                            ...grupoDeFotos,
                            image_files:
                              grupoDeFotos.image_files &&
                              grupoDeFotos.image_files
                                ? grupoDeFotos.image_files.reverse()
                                : []
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            ) : fotos.length === 0 ? (
              <Grid item xs={12} md={6}>
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
                                  onSubmit={event => this.insertCancion(event)}
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
                                      this.setState({ title: value });
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
                                        this.setState({ img: value });
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
                                      color:
                                        porUrl === false ? "black" : "#9e9e9e"
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
                                        onClick={() =>
                                          this.setState({
                                            previsualizarFoto: true
                                          })
                                        }
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
                              title={title}
                            />
                          </Card>
                          {/* <GridList
                          // cellHeight={180}
                          style={{ width: 387, height: 251 }}
                        >
                          <GridListTile>
                            <img src={img} alt={title} />
                            <GridListTileBar
                              title={title}
                              // subtitle={<span>by: {tile.author}</span>}
                              // actionIcon={
                              //   <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                              //     <InfoIcon />
                              //   </IconButton>
                              // }
                            />
                          </GridListTile>
                        </GridList> */}
                        </Grid>
                      ) : null}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              <span>nothing</span>
            )}
          </Grid>
        )}
      </div>
    );
  }
}
