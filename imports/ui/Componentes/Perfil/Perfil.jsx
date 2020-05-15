import React from 'react';
import Header from '../Header/Header.jsx';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PerfilStyle from '../../Estilos/Perfil/PerfilStyle.jsx';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TooltipTrigger from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

const Tooltip = ({children, tooltip, hideArrow, ...props}) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement
    }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container'
        })}
      >
        {!hideArrow && (
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: 'tooltip-arrow',
              'data-placement': placement
            })}
          />
        )}
        {tooltip}
      </div>
    )}
  >
    {({getTriggerProps, triggerRef}) => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
          className: 'trigger'
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);


class Perfil extends React.Component   {
  constructor(props) {
      super(props);
      this.state = {
        userData : {},
        agregarDescripcion: false
      };
    }

  componentDidMount(){
    Meteor.call('findUserById', (err, result)=>{
      if (err) {
        console.error(err);;
      }else {
        this.setState({userData : result })
      }
    })
  }
  // funcion para validar el tipo y el tamaño de los archivos cargados desde el fileinput
onChangeFile(e) {
  // extraigo las propiedades del inputfile
  const input = document.getElementById('profilePic');

  // Lista de formatos de archivos para ser adjuntados
  const formatos = ['image/png', 'image/jpeg', 'image/jpg'];

  // ciclo para recorrer los archivos y extraer sus propiedades
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    if (!formatos.includes(input.files[0].type)) {
      this.setState({ MsgError: 'Solo podra cargar imagenes' });
      console.error('Solo podra cargar imagenes');
    } else {
      // Si cumple con las condiciones, inserto el archivo en file y filename
      // convierte el archivo a base64
      reader.readAsDataURL(input.files[0]);
      // inserto en files el archivo en base64
      reader.onload = function(e) {
        const userData = this.state.userData;
        userData.profilePic = e.target.result;
        this.setState({ contentFile: e.target.result, userData});
      }.bind(this);

      // inserto las propiedades del archivo en filesName
      this.setState({
        nombreFile: input.files[0].name,
        typeFile: input.files[0].type,
        sizeFile: input.files[0].size,
      });
    }
  }
}
  editPerfil(){

  }
  render(){
    const {userData } = this.state;
    const {classes} = this.props
    return (<div>
      <Header />

      {userData && userData._id ?
        <Grid container justify="center"
  alignItems="center">
          <Grid item xs={12} md={6}>
            <Card // className={classes.root}
              >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={userData.profilePic || "https://ichef.bbci.co.uk/images/ic/720x405/p08bdwzk.jpg"}
          title="Random photo of hubble"
        />
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <div style={{textAlign: 'right'}}>
                <Tooltip placement="left" tooltip="Cambiar Portada">
          <input
                          style={{ display: 'none' }}
                          // className={classes.input}
                          id="profilePic"
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={this.onChangeFile.bind(this)}
                          type="file"
                        />
          <label htmlFor="profilePic">
                          <IconButton  aria-label="upload picture" component="span">
                            <AddAPhotoIcon />
                          </IconButton>
                        </label>
                      </Tooltip>
                      </div>
                      </Grid>
          <Typography gutterBottom variant="h5" component="h2">
            {userData.profile.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {this.state.agregarDescripcion ?
              <span>Text goes here</span>
            : userData.description || <Button simple="true" color="inherit" onClick={()=>this.setState({agregarDescripcion: true })} >Agregar una breve descripción</Button> }
          </Typography>
        </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>

          </Grid>
        </Grid>
      : null }
      </div>) } }

      export default withStyles(PerfilStyle)(Perfil);
