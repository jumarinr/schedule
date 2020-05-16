import React from 'react';
import Link from '@material-ui/core/Link';
import Header from '../Header/Header.jsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


  export default class Contacto extends React.Component   {
  constructor(props) {
      super(props);
      this.state = {
      };
    }
  render(){
    const {classes} = this.props
    return (<div>
      <Header component="Contacto" />
      <Grid container justify="center"
alignItems="center">
        <Grid item xs={12} md={6}>
          <h4>
            Página diseñada para el manejo de notas, musica, calendario y un perfil basico
          </h4>
        </Grid>
      </Grid>
   </div>) } }
