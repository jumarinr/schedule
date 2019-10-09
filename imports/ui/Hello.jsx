import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';



export default class Hello extends Component {
  state = {
    counter: 0,
    texto: "",
    Nombre: "",
  }

  onClickMethod(){
    Meteor.call('metodoPruebat', {constante: "alfa"}, (error, resultado)=>{
      if(error){
        console.log(error);
        
      }else{
        alert(resultado)
      }
    } )
  }

  handleChange(event, estado){
    console.log(event.target.value)
    this.setState({ [`${estado}`]: event.target.value})
  }

  render() {
    return (
      <div>
         <form  noValidate autoComplete="off">
        <Grid container style={{color: "grey"}}>
        <Grid item >
          <TextField
            id="Nombre"
            label="Nombre Completo"
            value={this.state.Nombre}
            onChange={(event)=>{this.handleChange(event, 'Nombre')}}
            margin="normal"
          />
          </Grid>
          </Grid>
        <Grid container style={{ color: "grey" }}>
          <Grid item>
            <TextField
              id="correo"
              type="email"
              autoComplete="email"
              required={true}
              label="Correo electronico"
              value={this.state.correo}
              onChange={(event) => { this.handleChange(event, 'correo') }}
              margin="normal"
            />
          </Grid>
          </Grid>
          </form>
      </div>
    );
  }
}
