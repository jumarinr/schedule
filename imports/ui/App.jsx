import React, { Component } from 'react';
import RegistrarTrabajador from './RegistrarTrabajador.jsx';
import Grid from '@material-ui/core/Grid';
import RegistroVacunas from './RegistroVacunas.jsx';
import Button from '@material-ui/core/Button'; 


export default class App extends Component {
  state = {
    options: true
  }


  render() {
    return (
  <div>
  <div style={{float: 'left'}}>
  <Grid container>
  <Grid item>
  <img src="https://cf.shopee.co.th/file/56b61e38ffd20a978be6381a9cab055d_tn" width="42" height="42"/>
  </Grid>
  &nbsp;
  <Grid item style={{marginTop: '6%'}}>
  Salud Ocupacional</Grid>
  </Grid>
  
  </div>
  <div style={{float: 'right'}}>
  <Button onClick={()=>this.setState({options:true})} disabled={this.state.options} variant="contained" size="small" >
  Registro de trabajadores
                      </Button>
                      &nbsp; &nbsp;
  <Button onClick={()=>this.setState({options:false})} disabled={!this.state.options} variant="contained" size="small" >Registro de vacunas</Button> 
 
  </div>
  
    <div>
      { this.state.options ?  <RegistrarTrabajador /> : 
      <RegistroVacunas /> }
  </div>
  </div>
    )}
};
