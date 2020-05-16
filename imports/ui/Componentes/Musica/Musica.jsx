import React from 'react';
import Link from '@material-ui/core/Link';
import Header from '../Header/Header.jsx';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';

  export default class Musica extends React.Component   {
  constructor(props) {
      super(props);
      this.state = {
      };
    }
  render(){
    const {classes} = this.props
    return (<div>
      <Header component="Musica" />
      <Grid container justify="center"
  alignItems="center">
  <Grid item xs={12} md={6}>
    <Card>
      <CardContent>
      <AudioPlayer
        showDownloadProgress={true}
        showFilledProgress={true}
     autoPlay
     src="https://drive.google.com/uc?id=1BPKJAD8CubiySYYPNyIDQjOMLUpnx7Ow"
     // "https://doc-0o-ak-docs.googleusercontent.com/docs/securesc/ecvbjpd886u1a9nlr9geevvau7rs8cm0/gv2t3i97dmp3g5di8gj64slrrnr5t5q0/1589645925000/06126887558336420710/06126887558336420710/1BPKJAD8CubiySYYPNyIDQjOMLUpnx7Ow?h=17274713730139185629&authuser=0&nonce=sadhaki2gkkko&user=06126887558336420710&hash=gli7pd3dcdr6bg89d1gqsde3nl2gl0fr"
     onPlay={e => console.log("onPlay")}
     // other props here
   />
 </CardContent>
 </Card>
 </Grid>
 </Grid>
   </div>) } }
