import React from 'react';
import Header from '../Header/Header.jsx';
import AppBarOffset from '../Header/Machetazo.jsx';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PerfilStyle from '../../Estilos/Perfil/PerfilStyle.jsx';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TooltipTrigger from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PageviewIcon from '@material-ui/icons/Pageview';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import clsx from 'clsx';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import NoteIcon from '@material-ui/icons/Note';
import Divider from '@material-ui/core/Divider';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import 'moment/locale/es';
// get our fontawesome imports
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

  <i className="fas fa-sticky-note" />;

const Tooltip = ({
  children, tooltip, hideArrow, ...props
}) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement,
    }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
        })}
      >
        {!hideArrow && (
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: 'tooltip-arrow',
              'data-placement': placement,
            })}
          />
        )}
        {tooltip}
      </div>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: 'trigger',
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);

class InfoCuenta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      agregarDescripcion: false,
      description: '',
      anchorEl: null,
      openError: false,
      openSuccess: false,
      msgError: '',
      msgSuccess: '',
      editarPerfil: false,
      loadingInfo: true,
      expanded: false,
      canciones: 0,
      calendario: 0,
      notas: 0,
      fotos: 0,
      topArtistas: [],
      ultimaNota: [],
      ultimaFoto: [],
      ultimoEvento: [],
    };
  }

  componentDidMount() {
    Meteor.call('estadisticasUsuario', (err, result) => {
      if (err) {
        console.error(err);
        this.setState({
          loadingInfo: false,
          msgError: 'Error fatal',
          openError: true,
        });
      } else {
        console.log(result);
        this.setState({
          userData: result.userData,
          canciones: result.canciones,
          calendario: result.calendario,
          notas: result.notas,
          fotos: result.fotos,
          topArtistas: result.topArtistas,
          ultimaNota: result.ultimaNota,
          ultimaFoto: result.ultimaFoto,
          ultimoEvento: result.ultimoEvento,
          loadingInfo: false,
        });
      }
    });
  }

  render() {
    const {
      userData,
      description,
      anchorEl,
      editarPerfil,
      loadingInfo,
      expanded,
      canciones,
      calendario,
      notas,
      fotos,
      topArtistas,
      ultimaNota,
      ultimaFoto,
      ultimoEvento,
    } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <AppBarOffset />
        <AppBarOffset />
        {userData && userData._id ? (
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card // className={classes.root}
                variant="outlined"
              >
                <CardHeader
                  avatar={(
                    <Avatar
                      alt={userData.profile.name[0]}
                      src={userData.profilePic}
                      // className={classes.large}
                    />
                  )}
                  title={userData.profile.name}
                  subheader={`Cuenta creada desde: ${moment(
                    userData.createdAt,
                  ).format('dddd Do MMMM [de] YYYY [a las] h:mm a')}`}
                />
                <CardMedia
                  className={classes.media}
                  image={
                    userData.portada
                    || 'https://ichef.bbci.co.uk/images/ic/720x405/p08bdwzk.jpg'
                  }
                  title="Random photo of hubble"
                />
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {userData.description ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: userData.description,
                            }}
                          />
                        ) : (
                          <span>
                            Agrega una descripción dando click
                            {' '}
                            <Link href="/Perfil">aquí</Link>
                          </span>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid item xs={12}>
                    <div style={{ float: 'right' }}>
                      Más info.
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={() => this.setState({ expanded: !expanded })}
                        aria-expanded={expanded}
                        edge="end"
                        aria-label="show more"
                        size="small"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </div>
                  </Grid>
                </CardActions>
                <Collapse in={expanded}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12}>
                        <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={(
                            <ListSubheader
                              component="div"
                              id="nested-list-subheader"
                            >
                              <b>Información del usuario</b>
                            </ListSubheader>
                          )}
                          style={{ width: '100%' }}
                        >
                          <ListItem>
                            <ListItemIcon>
                              <MusicNoteIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={(
                                <span>
                                  <b>
                                    {canciones}
                                    {' '}
                                  </b>
                                  canciones agregadas
                                </span>
                              )}
                              secondary={
                                topArtistas.length > 0 ? (
                                  <span>
                                    Principales artistas:
                                    {' '}
                                    {topArtistas.map((item, key) => {
                                      if (key === topArtistas.length - 1) {
                                        return ` ${item._id}`;
                                      }
                                      return ` ${item._id},`;
                                    })}
                                  </span>
                                ) : (
                                  <span>
                                    Para agregar canciones de click
                                    {' '}
                                    <Link href="/Musica" target="_blank">
                                      aquí
                                    </Link>
                                  </span>
                                )
                              }
                            />
                          </ListItem>
                          <Divider />
                          <ListItem>
                            <ListItemIcon>
                              <FontAwesomeIcon icon={faStickyNote} size="lg" />
                              {/* <i
                                className="fa fa-shopping-cart"
                                style={{ fontSize: 24 }}
                                // style={{ fontColor: "black" }}
                              /> */}
                              {/* <NoteIcon /> */}
                            </ListItemIcon>
                            <ListItemText
                              primary={(
                                <span>
                                  <b>
                                    {notas}
                                    {' '}
                                  </b>
                                  notas creadas
                                </span>
                              )}
                              secondary={
                                ultimaNota ? (
                                  <span>
                                    Ultima nota creada:
                                    {' '}
                                    {ultimaNota.nota}
                                  </span>
                                ) : (
                                  <span>
                                    Para crear notas de click
                                    {' '}
                                    <Link href="/Notas" target="_blank">
                                      aquí
                                    </Link>
                                  </span>
                                )
                              }
                            />
                          </ListItem>
                          <Divider />
                          <ListItem>
                            <ListItemIcon>
                              <EventNoteIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={(
                                <span>
                                  <b>
                                    {calendario}
                                    {' '}
                                  </b>
                                  eventos creadas
                                </span>
                              )}
                              secondary={
                                ultimoEvento ? (
                                  <span>
                                    Último evento creado:
                                    {' '}
                                    {ultimoEvento.evento}
                                  </span>
                                ) : (
                                  <span>
                                    Para crear eventos de click
                                    {' '}
                                    <Link href="/Calendario" target="_blank">
                                      aquí
                                    </Link>
                                  </span>
                                )
                              }
                            />
                          </ListItem>
                          <Divider />
                          <ListItem>
                            <ListItemIcon>
                              <PhotoAlbumIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={(
                                <span>
                                  <b>
                                    {fotos}
                                    {' '}
                                  </b>
                                  fotos agregadas
                                </span>
                              )}
                              secondary={
                                ultimaFoto ? (
                                  <span>
                                    Última foto agregada
                                    {' '}
                                    {ultimaFoto.foto}
                                  </span>
                                ) : (
                                  <span>
                                    Para agregar fotos de click
                                    {' '}
                                    <Link href="/Calendario" target="_blank">
                                      aquí
                                    </Link>
                                  </span>
                                )
                              }
                            />
                          </ListItem>
                        </List>
                        {/* <ul>
                          <li>Fotos agregadas: {fotos}</li>
                        </ul> */}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
        ) : loadingInfo ? (
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <div style={{ textAlign: 'center' }}>
                        Cargando la información...
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
        ) : null}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openError}
          autoHideDuration={6000}
          onClose={() => this.setState({ openError: false })}
        >
          <SnackbarContent
            style={{
              backgroundColor: 'red',
            }}
            message={this.state.msgError}
            action={[
              <IconButton
                key={1}
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => this.setState({ openError: false })}
              >
                <CloseIcon fontSize="small" />
              </IconButton>,
            ]}
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSuccess}
          autoHideDuration={6000}
          onClose={() => this.setState({ openSuccess: false })}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#004d40',
            }}
            message={this.state.msgSuccess}
            action={[
              <IconButton
                key={1}
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => this.setState({ openSuccess: false })}
              >
                <CloseIcon fontSize="small" />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(PerfilStyle)(InfoCuenta);
