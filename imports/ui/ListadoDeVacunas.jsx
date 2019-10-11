import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import 'react-day-picker/lib/style.css';

import CloseIcon from '@material-ui/icons/Close';


export default class ListadoDeVacunas extends Component {
  state = {
    vacunasSeleccionadas: [],
    msgError: "",
    open: false
  }
  componentDidMount(){
    const Vacunas = this.props.Vacunas;
    // console.log(Vacunas)
    if(Vacunas && Vacunas.length > 0){
        Vacunas.map((vacuna, key)=>{
            this.setState({[`${vacuna}`]: vacuna})
        })
    }
    Meteor.call('leerVacuna', {}, (error, resultado)=>{
        if(error){
            console.log(error);
            this.setState({msgError: error.message, open: true})
        }else{
            this.setState({vacunasSeleccionadas: resultado.data})
        }
    })
  }

  handleClick = newState => () => {
    this.setState({ open: true, });
  };



   handleClose = () => {
    this.setState({  open: false });
  };

   handleChange (name, event) {


   console.log(event.target.value)

    if(event.target.value == "true"){
        console.log("entra")
        this.props.changeVacunas(name, 'NoSeleccionarVacuna')
        this.setState({ [name]: event.target.checked });
    }else{
    this.setState({ [name]: event.target.checked });
    console.log(name)
    this.props.changeVacunas(name)
    }
  };

  render() {
    return (
  <div>

    {this.state.vacunasSeleccionadas ?
     (this.state.vacunasSeleccionadas.map((vacuna, key)=>{return(
        <div id={key}>
            <FormControlLabel
        control={
        <Checkbox
        checked={!!this.state[`${vacuna.nombre}`]}
        onChange={(event)=>this.handleChange(`${vacuna.nombre}`, event)}
        value={!!this.state[`${vacuna.nombre}`]}
        inputProps={{
          'aria-label': 'primary checkbox',
        }}
      />}
      label={`${vacuna.nombre}`}
      />
      </div>
     )})): 
     null}


<Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={this.state.open}
        style={{color: 'red'}}
        autoHideDuration={6000}
        onClose={()=>this.handleClose()}action
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
  </div>
    )}
};
