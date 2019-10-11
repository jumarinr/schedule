import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import 'react-day-picker/lib/style.css';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


import ListadoDeVacunas from './ListadoDeVacunas';


export default class RegistrarTrabajador extends Component {
  state = {
    counter: 0,
    texto: "",
    nombres: null,
    apellidos: "",
    direccion: "",
    correo: null,
    telefono: null,
    tipoIdentificacion: "CC",
    identificacion: null, 
    msgError: null,
    Vacunas: [],
    next: false,
    nivelDeRiesgo: null,
    selectedDay: undefined,
    areaTrabajo: null,
    detallesVacunacion: null,
    celular: null,
    contactoAllegado: null,

  }

  componentDidMount(){
    // Meteor
  }

  onClickMethod(){
    const {nombres, apellidos, direccion, correo, telefono,
      areaTrabajo, Vacunas,  tipoIdentificacion, celular,
      nivelDeRiesgoLaboral, identificacion, selectedDay,
      contactoAllegado
     } = this.state
    if(!correo){
      this.setState({msgError: "No se ha seleccionado correo", open: true})
      return false;
    }
    if(!nombres){
      this.setState({msgError: "No se ha seleccionado nombre", open: true})
      return false;
    }
    if(!apellidos){
      this.setState({msgError: "No se ha seleccionado apellido", open: true})
      return false;
    }
    if(!direccion){
      this.setState({msgError: "No se ha seleccionado dirección", open: true})
      return false;
    }
    if(!telefono){
      this.setState({msgError: "No se ha seleccionado telefono", open: true})
      return false;
    }
    if(!areaTrabajo){
      this.setState({msgError: "No se ha seleccionado area de trabajo", open: true})
      return false;
    }
    if(!Vacunas){
      this.setState({msgError: "No se ha seleccionado vacunas", open: true})
      return false;
    }
    if(!tipoIdentificacion){
      this.setState({msgError: "No se ha seleccionado tipo de identificación", open: true})
      return false;
    }
    if(!celular){
      this.setState({msgError: "No se ha seleccionado celular", open: true})
      return false;
    }
    if(!nivelDeRiesgoLaboral){
      this.setState({msgError: "No se ha seleccionado nivel de riezgo laboral", open: true})
      return false;
    }
    if(!identificacion){
      this.setState({msgError: "No se ha seleccionado identificación", open: true})
      return false;
    }
    if(!selectedDay){
      this.setState({msgError: "No se ha seleccionado fecha", open: true})
      return false;
    }

    if(!contactoAllegado){
      this.setState({msgError: "No se ha seleccionado contacto allegado", open: true})
      return false;
    }

    // console.log(constante)
    const DataToSend = {nombres, apellidos, direccion, correo, telefono,
      areaTrabajo, detallesVacunacion: Vacunas,  tipoIdentificacion, celular,
      nivelDeRiesgoLaboral, identificacion, fechaNacimiento: selectedDay,
      contactoAllegado}
    Meteor.call('insertarTrabajador', DataToSend, (error, resultado)=>{
      if(error){
        console.log(error);
        this.setState({msgError: error.message, open: true})

      }else{
        this.setState({msgSuccess: "¡Trabajador creado con exito!", openSuccess: true})
      }
    } )
  }
  handleDayChange(day) {
    this.setState({ selectedDay: day });
  }

  handleChange(event, estado){
    // console.log(event.target.value)
    this.setState({ [`${estado}`]: event.target.value})
  }

  handleClick = newState => () => {
    this.setState({ open: true, });
  };


   handleClose = () => {
    this.setState({  open: false });
  };
  changeVacunas(Vacuna, metodo){
    let Vacunas = this.state.Vacunas;
    if(metodo == "NoSeleccionarVacuna"){
      const indexBorrar = Vacunas.indexOf(Vacuna);
      // console.log(indexBorrar)

      Vacunas.splice(indexBorrar, 1);
      // console.log(Vacunas)
      this.setState({Vacunas})      
    }else{
    Vacunas.push(Vacuna)
    //console.log(Vacunas)
    this.setState({Vacunas})
    }
  }

  render() {
    return (
      <div>
        {this.state.next == false ? 
        <Grid container >
                  
        <Grid item xs={12} >
          <TextField
            id="nombres"
            label="Nombres"
            value={this.state.nombres}
            onChange={(event)=>{this.handleChange(event, 'nombres')}}
            margin="normal"
          />
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="apellidos"
              label="Apellidos"
              value={this.state.apellidos}
              onChange={(event)=>{this.handleChange(event, 'apellidos')}}
              margin="normal"
            />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="direccion"
                label="Direccion actual"
                value={this.state.direccion}
                onChange={(event)=>{this.handleChange(event, 'direccion')}}
                margin="normal"
              />
              </Grid>
              
          <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                id="tipoIdentificacion"
                required={true}
                label="Tipo de documento"
                value={this.state.tipoIdentificacion}
                onChange={(event) => { this.handleChange(event, 'tipoIdentificacion') }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="identificacion"
                required={true}
                label="Identificacion"
                value={this.state.identificacion}
                onChange={(event) => { this.handleChange(event, 'identificacion') }}
                margin="normal"
              />
            </Grid>
              <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <TextField
                      id="nivelDeRiesgo"
                      required={true}
                      type="number"
                      label="Seleccione el nivel de riesgo"
                      value={this.state.nivelDeRiesgoLaboral}
                      onChange={(event) => { this.handleChange(event, 'nivelDeRiesgoLaboral') }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="areaTrabajo"
                      required={true}
                      type="number"
                      label="Seleccione el area de trabajo"
                      value={this.state.areaTrabajo}
                      onChange={(event) => { this.handleChange(event, 'areaTrabajo') }}
                      margin="normal"
                    />
                  </Grid>
                <Grid item xs={12}>
                <span>Fecha de nacimiento:</span>
                <DayPickerInput onDayChange={(event)=>this.handleDayChange(event)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      id="contactoAllegado"
                      required={true}
                      type="number"
                      label="Seleccione el contacto de allegado"
                      value={this.state.contactoAllegado}
                      onChange={(event) => { this.handleChange(event, 'contactoAllegado') }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
          <Button onClick={()=>this.setState({next: true})} variant="contained" size="small" >

          
        Ingresar Vacunas
      </Button>
      </Grid>
                {/*Todo: Terminar la función de herencia. */}
                </Grid>
                
                :    <Grid container> <ListadoDeVacunas changeVacunas={this.changeVacunas.bind(this)} 
                Vacunas={this.state.Vacunas}
              /> </Grid>     }
                {this.state.next ? (
                  <Grid container>

                    <Grid item xs={3}>
                      <Button onClick={()=>this.setState({next: false})} variant="contained" size="small" >
                        Anterior
                      </Button>
                    </Grid> 
                    <Grid item xs={3}>
                      <Button onClick={()=>this.onClickMethod()} variant="contained" size="small" >
Registrar Trabajador
</Button>
</Grid>
</Grid>
                ) :  null }

<Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={this.state.open}
        style={{color: 'red'}}
        autoHideDuration={6000}
        onClose={()=>this.handleClose()}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        action={[,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={()=>this.handleClose()}
            
          >
            <CloseIcon />
          </IconButton>
        ]}
        message={<span id="message-id">{this.state.msgError}</span>}
      />

<Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={this.state.openSuccess}
        autoHideDuration={6000}
        onClose={()=>this.setState({openSuccess: false})}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        action={[,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={()=>this.setState({openSuccess: false})}
            
          >
            <CloseIcon />
          </IconButton>
        ]}
        message={<span id="message-id">{this.state.msgSuccess}</span>}
      />
      </div>
    );
  }
}
