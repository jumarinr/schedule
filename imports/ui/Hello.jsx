import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';



export default class Hello extends Component {
  state = {
    counter: 0,
    texto: "",
    Nombre: "",
    Apellido: "",
    Direccion: "",
    Correo: "",
    telefono: null,
    tipoDoc: "CC"
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
         <form  noValidate autoComplete="on">
        <Grid container style={{color: "grey"}}>
        <Grid item >
          <TextField
            id="Nombre"
            label="Nombres"
            value={this.state.Nombre}
            onChange={(event)=>{this.handleChange(event, 'Nombre')}}
            margin="normal"
          />
          </Grid>
          </Grid>
          <Grid container style={{color: "grey"}}>
          <Grid item >
            <TextField
              id="Apellidos"
              label="Appelidos"
              value={this.state.Apellido}
              onChange={(event)=>{this.handleChange(event, 'Apellido')}}
              margin="normal"
            />
            </Grid>
            </Grid>
            <Grid container style={{color: "grey"}}>
            <Grid item >
              <TextField
                id="Direccion"
                label="Direccion actual"
                value={this.state.Direccion}
                onChange={(event)=>{this.handleChange(event, 'Direccion')}}
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
              value={this.state.Correo}
              onChange={(event) => { this.handleChange(event, 'Correo') }}
              margin="normal"
            />
          </Grid>
          </Grid>
          <Grid container style={{ color: "grey" }}>
            <Grid item>
              <TextField
                id="tipoDoc"
                required={true}
                label="Tipo de documento"
                value={this.state.tipoDoc}
                onChange={(event) => { this.handleChange(event, 'tipoDoc') }}
                margin="normal"
              />
            </Grid>
            </Grid>
            <Grid container style={{ color: "grey" }}>
              <Grid item>
                <TextField
                  id="telefono"
                  required={true}
                  type="number"
                  label="Telefono"
                  value={this.state.telefono}
                  onChange={(event) => { this.handleChange(event, 'telefono') }}
                  margin="normal"
                />
              </Grid>
              </Grid>
              <Grid container style={{ color: "grey" }}>
                <Grid item>
                  <TextField
                    id="celular"
                    required={true}
                    type="number"
                    label="Celular"
                    value={this.state.celular}
                    onChange={(event) => { this.handleChange(event, 'celular') }}
                    margin="normal"
                  />
                </Grid>
                </Grid>
                <Grid container style={{ color: "grey" }}>
                  <Grid item>
                    <TextField
                      id="nivelDeRiesgo"
                      required={true}
                      type="number"
                      label="Seleccione el nivel de riesgo"
                      value={this.state.nivelDeRiesgo}
                      onChange={(event) => { this.handleChange(event, 'nivelDeRiesgo') }}
                      margin="normal"
                    />
                  </Grid>
                  </Grid>
                <Grid container >
                <Grid item>
                <DayPicker/>
                </Grid>
                </Grid>
          </form>
      </div>
    );
  }
}
