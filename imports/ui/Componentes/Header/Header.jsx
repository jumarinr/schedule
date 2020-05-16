import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'left',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function Header(props) {
  const classes = useStyles();
  // const { sections, title } = props;
  const [title] = React.useState('Guru - Schedule');
  const [ sections, setSections ] = React.useState([]);
  const [ userData, setuserData ] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => { // Pass in a callback function!
    Meteor.call('readEnlaces', (err, result)=>{
      if (err) {
        console.error(err);
      }else {
        setSections(result)
      }
    })
    actualizarListado()
    }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const actualizarListado = () =>{
    Meteor.call('findUserById', (err, result)=>{
      if (err) {
        console.error(err);
      }else {
        setuserData(result)
      }
    })
  };
  return (
    userData && userData._id ?
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={handleClick}>
{userData.profilePic ? <Avatar alt="" src={userData.profilePic} /> : <Avatar >{userData.profile.name[0]}</Avatar> }
</IconButton>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem><Link href="/Perfil" color="inherit" underline="none"> <IconButton size='small'>
{userData.profilePic ? <Avatar alt="" src={userData.profilePic} className={classes.small}/> : <Avatar  className={classes.small} >{userData.profile.name[0]}</Avatar> }
</IconButton> &nbsp; Perfil</Link></MenuItem>
  <MenuItem onClick={handleClose}> <IconButton size='small'><InfoIcon style={{color: '#1565c0'}}/></IconButton>&nbsp;Info. Cuenta</MenuItem>
<MenuItem onClick={()=>Meteor.logout()}><IconButton size='small'><ExitToAppIcon style={{color: '#b71c1c'}}/> </IconButton>&nbsp; Salir</MenuItem>
</Menu>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>

    </React.Fragment>
    : null
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
