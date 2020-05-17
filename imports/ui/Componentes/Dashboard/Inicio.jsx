import React from "react";
import Header from "../Header/Header.jsx";
import AppBarOffset from "../Header/Machetazo.jsx";

export default class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    Meteor.call("findUserById", (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    });
  }
  render() {
    const { email, password } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Header component="Inicio" />

        <AppBarOffset />
        <AppBarOffset />
      </div>
    );
  }
}
