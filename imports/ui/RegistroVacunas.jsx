import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';



import TextField from '@material-ui/core/TextField';
import 'react-day-picker/lib/style.css';
import SaveIcon from '@material-ui/icons/Save';

import CloseIcon from '@material-ui/icons/Close';



export default class RegistroVacunas extends Component {
  state = {
    nombre: null,
    descripcion : null,
    periodicidad : null,
    prestadorServicio : null,
    open: false,
    openSuccess: false,
    msgError: null,
  }

  componentDidMount(){
      // this.setState({nombre: "Prueba del renderizado del didMount"})
  }

  onClickMethod(){
    if(!this.state.nombre || this.state.nombre == "" ){
      this.setState({msgError: "No se ha definido nombre", open: true})
      return false;
    }
    if(!this.state.descripcion || this.state.descripcion == "" ){
      this.setState({msgError: "No se ha definido descripción", open: true})
      return false;
    }
    if(!this.state.periodicidad || this.state.periodicidad == "" ){
      this.setState({msgError: "No se ha definido periodicidad", open: true})
      return false;
    }
    if(!this.state.prestadorServicio || this.state.prestadorServicio == ""){
      this.setState({msgError: "No se ha definido quien presta el servicio", open: true})
      return false;
    }
    // console.log(constante)
    const DataToSend = {nombre: this.state.nombre, 
                        descripcion: this.state.descripcion,
                        periodicidad: Number(this.state.periodicidad),
                        prestadorServicio: this.state.prestadorServicio,
                      }
    Meteor.call('insertarVacuna', DataToSend, (error, resultado)=>{
      if(error){
        console.log(error);
        this.setState({msgError: error.message})

      }else{
        this.setState({msgSuccess: "¡Vacuna creada con éxito!",
        nombre: "", 
                        descripcion: "",
                        periodicidad: "",
                        prestadorServicio: "",
                        openSuccess: true
      })
      }
    } )
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
  render() {
    return (
      <div>

        <Grid container style={{color: "grey"}}>
        <Grid item xs={12}>
          <TextField
            id="nombre"
            label="Nombre Vacuna"
            value={this.state.nombre}
            onChange={(event)=>{this.handleChange(event, 'nombre')}}
            margin="normal"
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            id="descripcion"
            label="Descripción"
            value={this.state.descripcion}
            onChange={(event)=>{this.handleChange(event, 'descripcion')}}
            margin="normal"
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            id="periodicidad"
            type="number"
            required
            label="Periodicidad"
            value={this.state.periodicidad}
            onChange={(event)=>{this.handleChange(event, 'periodicidad')}}
            margin="normal"
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            id="prestadorServicio"
            required
            label="Prestador del servicio"
            value={this.state.prestadorServicio}
            onChange={(event)=>{this.handleChange(event, 'prestadorServicio')}}
            margin="normal"
          />
          </Grid>
          <Grid item>
          <Button onClick={()=>this.onClickMethod()} variant="contained" size="small"  startIcon={<SaveIcon />}>

          
        Registrar Vacuna
      </Button>
          </Grid>
                </Grid>
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
