import React from "react";
import Link from "@material-ui/core/Link";
import Header from "../Header/Header.jsx";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
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

const playlist = [
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
      currentMusicIndex: 0
    };
  }
  handleClickPrevious() {
    const { currentMusicIndex } = this.state;
    if (playlist[currentMusicIndex - 1]) {
      this.setState({ currentMusicIndex: currentMusicIndex - 1 });
    }
  }
  handleClickNext() {
    const { currentMusicIndex } = this.state;
    if (currentMusicIndex + 2 <= playlist.length) {
      this.setState({ currentMusicIndex: currentMusicIndex + 1 });
    }
  }
  render() {
    const { classes } = this.props;
    const { currentMusicIndex } = this.state;
    return (
      <div>
        <Header component="Musica" />
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Card>
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
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
