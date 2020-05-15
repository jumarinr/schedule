import React from 'react';

export default class Inicio extends React.Component   {
  constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
      };
    }

  componentDidMount(){
    console.log(Meteor.userId());
  }
  render(){
    const {email, password } = this.state;
    const {classes} = this.props
    return (<div>Texto de prueba por estar logeado
      <button onClick={()=>Meteor.logout()}>Cerrar sesión</button> </div>) } }
