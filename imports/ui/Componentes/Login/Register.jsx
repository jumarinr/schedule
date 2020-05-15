import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';


import LoginStyle from '../../Estilos/Login/LoginStyle.jsx';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



class SignIn extends React.Component   {
  constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        nombre: "",
      };
    }
subirFormulario(event){
  event.preventDefault();
  const {password, email, nombre} = this.state;
  Accounts.createUser({
    username: email,
    email,
    password,
    profile: {name: nombre}
  }, (err, result)=>{
    if (err) {
      console.error(err);
    }else{
      console.log(result);
    }
  })
}
render(){
  const {email, password, nombre  } = this.state;
  const {classes} = this.props
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro para Guru-Schedule
        </Typography>
        <form className={classes.form} validate="true" onSubmit={(event)=>this.subirFormulario(event)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="Nombre completo o apodo"
            name="nombre"
            autoComplete="text"
            autoFocus
            value={nombre}
  onChange={(e) => {
    const { value } = e.target
    // maybe more code here...
    this.setState({ nombre: value })}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
  onChange={(e) => {
    const { value } = e.target
    // maybe more code here...
    this.setState({ email: value })}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
  onChange={(e) => {
    const { value } = e.target
    // maybe more code here...
    this.setState({ password: value })}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarme ahora!
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                ¿Tienes una cuenta? Ingresa aqui ahora!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
}

export default withStyles(LoginStyle)(SignIn);
