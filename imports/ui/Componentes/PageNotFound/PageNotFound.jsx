import React from 'react';
import Link from '@material-ui/core/Link';

export default class PageNotFound extends React.Component   {
  constructor(props) {
      super(props);
      this.state = {
      };
    }
  render(){
    const {classes} = this.props
    return (<div>
      Pagina no encontrada :/
      <hr/>
      <Link href="/">Ir a pagína principal</Link> </div>) } }
