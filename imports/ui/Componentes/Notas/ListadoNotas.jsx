import ReactPaginate from "react-paginate";
import React from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

import Header from "../Header/Header.jsx";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PerfilStyle from "../../Estilos/Perfil/PerfilStyle.jsx";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import TooltipTrigger from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import AppBarOffset from "../Header/Machetazo.jsx";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LinearProgress from "@material-ui/core/LinearProgress";
import RefreshIcon from "@material-ui/icons/Refresh";

import NuevaNota from "./NuevaNota";
import SingleNota from "./SingleNota";
class ListadoNotas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      openModalAddPhoto: false,
      notas: [],
      loadingNotas: false
    };
  }

  componentDidMount() {
    this.obtenerNotas();
  }

  obtenerNotas() {
    this.setState({ loadingNotas: true });
    Meteor.call("getNotesByUser", (err, result) => {
      if (err) {
        console.error(err);
        this.setState({
          loadingNotas: false,
          msgError: "Error fatal",
          openError: true
        });
      } else {
        const { notas } = result;

        this.setState({ loadingNotas: false, notas });
      }
    });
  }

  openModalAddPhoto() {
    this.setState({ openModalAddPhoto: !this.state.openModalAddPhoto });
  }

  render() {
    const { userData, openModalAddPhoto, notas, loadingNotas } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Header component="Notas" />
        <AppBarOffset />
        <AppBarOffset />
        <Grid container>
          <Grid item xs={12}>
            <div style={{ textAlign: "right" }}>
              <IconButton
                color="secondary"
                onClick={() => this.openModalAddPhoto()}
                size="small"
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => this.obtenerNotas()}
                size="small"
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12}>
            {loadingNotas ? (
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12}>
                          <div style={{ textAlign: "center" }}>
                            Cargando notas guardadas
                          </div>
                        </Grid>
                        <hr />
                        <Grid item xs={12}>
                          <LinearProgress color="secondary" />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                {notas.map((item, key) => (
                  <Grid item xs={12} md={4} key={key}>
                    <SingleNota
                      nota={item}
                      obtenerNotas={this.obtenerNotas.bind(this)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        <NuevaNota
          openModalAddPhoto={openModalAddPhoto}
          handleOpenModalAddPhoto={this.openModalAddPhoto.bind(this)}
          obtenerNotas={this.obtenerNotas.bind(this)}
          // insertFoto={this.insertFoto.bind(this)}
        />
      </div>
    );
  }
}

export default withStyles(PerfilStyle)(ListadoNotas);
