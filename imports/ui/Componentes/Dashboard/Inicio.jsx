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
    Meteor.call('findUserById', (err, result)=>{
      if (err) {
        console.error(err);;
      }else {
        console.log(result);
      }
    })
  }
  render(){
    const {email, password } = this.state;
    const {classes} = this.props
    return (<div>Texto de prueba por estar logeado
      <button onClick={()=>Meteor.logout()}>Cerrar sesión</button> </div>) } }
