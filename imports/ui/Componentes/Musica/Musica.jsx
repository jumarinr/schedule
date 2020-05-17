import React from "react";
import Link from "@material-ui/core/Link";
import Header from "../Header/Header.jsx";
import AppBarOffset from "../Header/Machetazo.jsx";
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
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";

export default class Musica extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMusicIndex: 0,
      playlist: [],
      name: "",
      src: "",
      portada: "",
      previsualizarCancion: false,
      currentSong: null,
      showPlaylist: false,
      artist: ""
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
        this.setState({
          playlist: result,
          currentMusicIndex: 0,
          currentSong: result[0] ? result[0].src : null
        });
      }
    });
  }
  insertCancion(event) {
    event.preventDefault();
    const { name, src, portada, artist } = this.state;
    Meteor.call(
      "insertCancionByUser",
      { name, src, portada, artist },
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          this.setState({
            src: "",
            name: "",
            portada: "",
            artist: "",
            previsualizarCancion: false
          });
          this.actualizarListadoCanciones();
        }
      }
    );
  }
  handleClickPlayList(key) {
    const { playlist } = this.state;
    console.log(playlist, key);
    this.setState({ currentSong: playlist[key].src, currentMusicIndex: key });
  }
  handleClickPrevious() {
    const { currentMusicIndex, playlist } = this.state;
    if (playlist[currentMusicIndex - 1]) {
      this.setState({ currentSong: null }, err => {
        if (err) {
          console.error(err);
        } else {
          this.setState({
            currentMusicIndex: currentMusicIndex - 1,
            currentSong: playlist[currentMusicIndex - 1].src
          });
        }
      });
    }
  }
  handleClickNext() {
    const { currentMusicIndex, playlist } = this.state;
    if (currentMusicIndex + 2 <= playlist.length) {
      this.setState({ currentSong: null }, err => {
        if (err) {
          console.error(err);
        } else {
          this.setState({
            currentMusicIndex: currentMusicIndex + 1,
            currentSong: playlist[currentMusicIndex + 1].src
          });
        }
      });
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
      previsualizarCancion,
      currentSong,
      showPlaylist,
      artist
    } = this.state;
    return (
      <div>
        <Header component="Musica" />

        <AppBarOffset />
        <AppBarOffset />

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
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <Grid container>
                          <Grid item xs={11}>
                            <AudioPlayer
                              showDownloadProgress={true}
                              showFilledProgress={true}
                              showSkipControls={true}
                              header={`${playlist[currentMusicIndex].name} - ${playlist[currentMusicIndex].artist}`}
                              autoPlayAfterSrcChange={true}
                              autoPlay={true}
                              src={currentSong}
                              onClickPrevious={() => this.handleClickPrevious()}
                              onClickNext={() => this.handleClickNext()}
                              customVolumeControls={[]}
                              customAdditionalControls={[]}
                              onEnded={() => {
                                if (currentMusicIndex === playlist.length - 1) {
                                  this.setState({
                                    currentMusicIndex: 0,
                                    currentSong: playlist[0].src
                                  });
                                } else {
                                  this.setState({
                                    currentMusicIndex: currentMusicIndex + 1,
                                    currentSong:
                                      playlist[currentMusicIndex + 1].src
                                  });
                                }
                              }}
                              customIcons={{
                                play: (
                                  <PlayCircleFilledSharpIcon
                                    style={{
                                      color: "#01579b",
                                      fontSize: "80%"
                                    }}
                                  />
                                ),
                                pause: (
                                  <PauseCircleFilledSharpIcon
                                    style={{
                                      color: "#01579b",
                                      fontSize: "80%"
                                    }}
                                  />
                                ),
                                rewind: (
                                  <FastRewindSharpIcon
                                    style={{
                                      color: "#01579b",
                                      fontSize: "80%"
                                    }}
                                  />
                                ),
                                forward: (
                                  <FastForwardSharpIcon
                                    style={{
                                      color: "#01579b",
                                      fontSize: "80%"
                                    }}
                                  />
                                ),
                                previous: (
                                  <SkipPreviousSharpIcon
                                    style={{
                                      color: "#01579b",
                                      fontSize: "80%"
                                    }}
                                  />
                                ),
                                next: (
                                  <SkipNextSharpIcon
                                    style={{
                                      color: "#01579b",
                                      fontSize: "80%"
                                    }}
                                  />
                                ),
                                loop: (
                                  <LoopSharpIcon
                                    style={{
                                      color: "#01579b",
                                      fontSize: "80%"
                                    }}
                                  />
                                ),
                                volume: (
                                  <VolumeUpIcon
                                    style={{
                                      color: "#01579b",
                                      fontSize: "80%"
                                    }}
                                  />
                                ),
                                volumeMute: (
                                  <VolumeOffIcon
                                    style={{
                                      color: "#01579b",
                                      fontSize: "80%"
                                    }}
                                  />
                                )
                              }}
                              // other props here
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <div
                              style={{
                                float: "right"
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() =>
                                  this.setState({
                                    showPlaylist: !this.state.showPlaylist
                                  })
                                }
                              >
                                <QueueMusicIcon />
                              </IconButton>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                      {showPlaylist ? (
                        <Grid item xs={12} md={12}>
                          <List style={{ width: "100%" }}>
                            {playlist.map((song, key) => {
                              return (
                                <ListItem
                                  key={key}
                                  selected={key === currentMusicIndex}
                                >
                                  <ListItemAvatar>
                                    <Avatar src={song.portada} />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={song.name}
                                    secondary={`- ${song.artist}`}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton
                                      edge="end"
                                      aria-label="delete"
                                      onClick={() =>
                                        key === currentMusicIndex
                                          ? null
                                          : this.handleClickPlayList(key)
                                      }
                                    >
                                      {key === currentMusicIndex ? null : (
                                        <PlayCircleFilledSharpIcon />
                                      )}
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              );
                            })}
                          </List>
                        </Grid>
                      ) : null}
                    </Grid>
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
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Agrega tu canciones favoritas!
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
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
                            label="Nombre de la pista"
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
                            label="Nombre del Artista"
                            type="text"
                            id="artist"
                            value={artist}
                            onChange={e => {
                              const { value } = e.target;
                              // maybe more code here...
                              this.setState({ artist: value });
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
                                  this.setState({
                                    previsualizarCancion: true
                                  })
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
                      </CardContent>
                    </Card>
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
                            header={`${name} - ${artist}`}
                            autoPlayAfterSrcChange={true}
                            autoPlay={true}
                            customAdditionalControls={[]}
                            src={src}
                            customVolumeControls={[]}
                            customIcons={{
                              play: (
                                <PlayCircleFilledSharpIcon
                                  style={{
                                    color: "#01579b",
                                    fontSize: "80%"
                                  }}
                                />
                              ),
                              pause: (
                                <PauseCircleFilledSharpIcon
                                  style={{
                                    color: "#01579b",
                                    fontSize: "80%"
                                  }}
                                />
                              ),
                              rewind: (
                                <FastRewindSharpIcon
                                  style={{
                                    color: "#01579b",
                                    fontSize: "80%"
                                  }}
                                />
                              ),
                              forward: (
                                <FastForwardSharpIcon
                                  style={{
                                    color: "#01579b",
                                    fontSize: "80%"
                                  }}
                                />
                              ),
                              previous: (
                                <SkipPreviousSharpIcon
                                  style={{
                                    color: "#01579b",
                                    fontSize: "80%"
                                  }}
                                />
                              ),
                              next: (
                                <SkipNextSharpIcon
                                  style={{
                                    color: "#01579b",
                                    fontSize: "80%"
                                  }}
                                />
                              ),
                              loop: (
                                <LoopSharpIcon
                                  style={{
                                    color: "#01579b",
                                    fontSize: "80%"
                                  }}
                                />
                              ),
                              volume: (
                                <VolumeUpIcon
                                  style={{
                                    color: "#01579b",
                                    fontSize: "80%"
                                  }}
                                />
                              ),
                              volumeMute: (
                                <VolumeOffIcon
                                  style={{
                                    color: "#01579b",
                                    fontSize: "80%"
                                  }}
                                />
                              )
                            }}
                            onError={event => {
                              console.log(event);
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
