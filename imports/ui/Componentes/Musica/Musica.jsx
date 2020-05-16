import React from "react";
import Link from "@material-ui/core/Link";
import Header from "../Header/Header.jsx";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PlayCircleFilledSharpIcon from "@material-ui/icons/PlayCircleFilledSharp";
import PauseCircleFilledSharpIcon from "@material-ui/icons/PauseCircleFilledSharp";
import FastRewindSharpIcon from "@material-ui/icons/FastRewindSharp";
import FastForwardSharpIcon from "@material-ui/icons/FastForwardSharp";
import SkipPreviousSharpIcon from "@material-ui/icons/SkipPreviousSharp";
import SkipNextSharpIcon from "@material-ui/icons/SkipNextSharp";
import LoopSharpIcon from "@material-ui/icons/LoopSharp";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const notplaylist = [
  {
    name: "Woman - Mumford & Sons",
    src: "https://drive.google.com/uc?id=1BPKJAD8CubiySYYPNyIDQjOMLUpnx7Ow",
    portada: "https://drive.google.com/uc?id=1NJh7pHs8d2rin7GvOLuga3ShA7c7e4dv"
  },
  {
    name: "White Blank Page & Forever (Amazon Original) - Mumford & Sons",
    src: "https://drive.google.com/uc?id=1DQnNV2_UrN7HyivIU7_wdXwlr9AFGorr",
    portada: "https://drive.google.com/uc?id=1s3qfULxTd_7Fdx777sTG0u2b4Xy960YM"
  }
];

export default class Musica extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMusicIndex: 0,
      playlist: [],
      name: "",
      src: "",
      portada: "",
      previsualizarCancion: false
    };
  }
  componentDidMount() {
    this.actualizarListadoCanciones();
  }
  actualizarListadoCanciones() {
    Meteor.call("readCancionesByUser", (err, result) => {
      if (err) {
        console.error();
      } else {
        this.setState({ playlist: result });
      }
    });
  }
  insertCancion(event) {
    event.preventDefault();
    const { name, src, portada } = this.state;
    Meteor.call(
      "insertCancionByUser",
      { name, src, portada },
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          this.setState({ src: "", name: "", portada: "" });
          this.actualizarListadoCanciones;
        }
      }
    );
  }
  handleClickPrevious() {
    const { currentMusicIndex, playlist } = this.state;
    if (playlist[currentMusicIndex - 1]) {
      this.setState({ currentMusicIndex: currentMusicIndex - 1 });
    }
  }
  handleClickNext() {
    const { currentMusicIndex, playlist } = this.state;
    if (currentMusicIndex + 2 <= playlist.length) {
      this.setState({ currentMusicIndex: currentMusicIndex + 1 });
    }
  }
  render() {
    const { classes } = this.props;
    const {
      currentMusicIndex,
      playlist,
      name,
      src,
      portada,
      previsualizarCancion
    } = this.state;
    return (
      <div>
        <Header component="Musica" />
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              {playlist.length > 0 ? (
                <React.Fragment>
                  <CardMedia
                    // className={classes.media}
                    style={{ height: 140 }}
                    image={playlist[currentMusicIndex].portada}
                    title={playlist[currentMusicIndex].name}
                  />
                  <CardContent>
                    <AudioPlayer
                      showDownloadProgress={true}
                      showFilledProgress={true}
                      showSkipControls={true}
                      header={playlist[currentMusicIndex].name}
                      autoPlayAfterSrcChange={true}
                      autoPlay={true}
                      src={playlist[currentMusicIndex].src}
                      onClickPrevious={() => this.handleClickPrevious()}
                      onClickNext={() => this.handleClickNext()}
                      customVolumeControls={[]}
                      onEnded={() => {
                        if (currentMusicIndex === playlist.length - 1) {
                          this.setState({ currentMusicIndex: 0 });
                        } else {
                          this.setState({
                            currentMusicIndex: currentMusicIndex + 1
                          });
                        }
                      }}
                      customIcons={{
                        play: (
                          <PlayCircleFilledSharpIcon
                            style={{ color: "#01579b", fontSize: "80%" }}
                          />
                        ),
                        pause: (
                          <PauseCircleFilledSharpIcon
                            style={{ color: "#01579b", fontSize: "80%" }}
                          />
                        ),
                        rewind: (
                          <FastRewindSharpIcon
                            style={{ color: "#01579b", fontSize: "80%" }}
                          />
                        ),
                        forward: (
                          <FastForwardSharpIcon
                            style={{ color: "#01579b", fontSize: "80%" }}
                          />
                        ),
                        previous: (
                          <SkipPreviousSharpIcon
                            style={{ color: "#01579b", fontSize: "80%" }}
                          />
                        ),
                        next: (
                          <SkipNextSharpIcon
                            style={{ color: "#01579b", fontSize: "80%" }}
                          />
                        ),
                        loop: (
                          <LoopSharpIcon
                            style={{ color: "#01579b", fontSize: "80%" }}
                          />
                        ),
                        volume: (
                          <VolumeUpIcon
                            style={{ color: "#01579b", fontSize: "80%" }}
                          />
                        ),
                        volumeMute: (
                          <VolumeOffIcon
                            style={{ color: "#01579b", fontSize: "80%" }}
                          />
                        )
                      }}
                      // other props here
                    />
                  </CardContent>
                </React.Fragment>
              ) : (
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      No tiene canciones agregadas
                    </Grid>
                  </Grid>
                </CardContent>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Agrega tu canciones favoritas!
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                        name="name"
                        label="Nombre de la pista - Artista"
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => {
                          const { value } = e.target;
                          // maybe more code here...
                          this.setState({ name: value });
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        color="secondary"
                        name="name"
                        label="Enlace de la pista"
                        type="url"
                        id="src"
                        value={src}
                        onChange={e => {
                          const { value } = e.target;
                          // maybe more code here...
                          this.setState({ src: value });
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        color="secondary"
                        name="portada"
                        label="Enlace de la Portada"
                        type="url"
                        id="portada"
                        value={portada}
                        onChange={e => {
                          const { value } = e.target;
                          // maybe more code here...
                          this.setState({ portada: value });
                        }}
                      />
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
                              this.setState({ previsualizarCancion: true })
                            }
                          >
                            <div
                              style={{
                                textTransform: "capitalize",
                                fontSize: "70%"
                              }}
                            >
                              Previsualizar canción
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
                              Agregar Canción!
                            </div>
                          </Button>
                        </ButtonGroup>
                      </div>
                    </form>
                  </Grid>
                  {previsualizarCancion ? (
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardMedia
                          // className={classes.media}
                          style={{ height: 140 }}
                          image={portada}
                          title={name}
                        />
                        <CardContent>
                          <AudioPlayer
                            showDownloadProgress={true}
                            showFilledProgress={true}
                            showSkipControls={false}
                            header={name}
                            autoPlayAfterSrcChange={true}
                            autoPlay={true}
                            src={src}
                            customVolumeControls={[]}
                            onEnded={() => {
                              if (currentMusicIndex === playlist.length - 1) {
                                this.setState({ currentMusicIndex: 0 });
                              } else {
                                this.setState({
                                  currentMusicIndex: currentMusicIndex + 1
                                });
                              }
                            }}
                            customIcons={{
                              play: (
                                <PlayCircleFilledSharpIcon
                                  style={{ color: "#01579b", fontSize: "80%" }}
                                />
                              ),
                              pause: (
                                <PauseCircleFilledSharpIcon
                                  style={{ color: "#01579b", fontSize: "80%" }}
                                />
                              ),
                              rewind: (
                                <FastRewindSharpIcon
                                  style={{ color: "#01579b", fontSize: "80%" }}
                                />
                              ),
                              forward: (
                                <FastForwardSharpIcon
                                  style={{ color: "#01579b", fontSize: "80%" }}
                                />
                              ),
                              previous: (
                                <SkipPreviousSharpIcon
                                  style={{ color: "#01579b", fontSize: "80%" }}
                                />
                              ),
                              next: (
                                <SkipNextSharpIcon
                                  style={{ color: "#01579b", fontSize: "80%" }}
                                />
                              ),
                              loop: (
                                <LoopSharpIcon
                                  style={{ color: "#01579b", fontSize: "80%" }}
                                />
                              ),
                              volume: (
                                <VolumeUpIcon
                                  style={{ color: "#01579b", fontSize: "80%" }}
                                />
                              ),
                              volumeMute: (
                                <VolumeOffIcon
                                  style={{ color: "#01579b", fontSize: "80%" }}
                                />
                              )
                            }}
                            // other props here
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ) : null}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
