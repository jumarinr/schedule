import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "0px"
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "left",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

export default function Header(props) {
  const classes = useStyles();
  // const { sections, title } = props;
  const [title] = React.useState("Guru - Schedule");
  const [sections, setSections] = React.useState([]);
  const [userData, setuserData] = React.useState({});
  const [loadingCircle, setLoadingCircle] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    // Pass in a callback function!
    actualizarListado();
  }, []);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const actualizarListado = () => {
    Meteor.call("findUserById", (err, result) => {
      if (err) {
        console.error(err);
        setLoadingCircle(false);
      } else {
        setuserData(result);
        setLoadingCircle(false);
        Meteor.call("readEnlaces", (err, result) => {
          if (err) {
            console.error(err);
          } else {
            setSections(result);
          }
        });
      }
    });
  };
  return (
    <React.Fragment>
      <AppBar color="inherit" position="fixed">
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
            {loadingCircle ? (
              <CircularProgress color="secondary" />
            ) : userData.profilePic ? (
              <Avatar alt="" src={userData.profilePic} />
            ) : (
              <Avatar>{userData.profile.name[0]}</Avatar>
            )}
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Link href="/Perfil" color="inherit" underline="none">
                {" "}
                <IconButton size="small">
                  {userData.profilePic ? (
                    <Avatar
                      alt=""
                      src={userData.profilePic}
                      className={classes.small}
                    />
                  ) : userData.profile ? (
                    <Avatar className={classes.small}>
                      {userData.profile.name[0]}
                    </Avatar>
                  ) : null}
                </IconButton>{" "}
                &nbsp; Perfil
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/MyAccount" color="inherit" underline="none">
                <IconButton size="small">
                  <InfoIcon style={{ color: "#1565c0" }} />
                </IconButton>
                &nbsp;Info. Cuenta
              </Link>
            </MenuItem>
            <MenuItem onClick={() => Meteor.logout()}>
              <IconButton size="small">
                <ExitToAppIcon style={{ color: "#b71c1c" }} />{" "}
              </IconButton>
              &nbsp; Salir
            </MenuItem>
          </Menu>
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        >
          {sections
            .filter(item => {
              if (
                item.title === "CuentaRegresiva" &&
                userData &&
                (userData.username === "jumarinr@unal.edu.co" ||
                  userData.username === "ccueto@unal.edu.co")
              ) {
                return { ...item };
              } else if (item.title !== "CuentaRegresiva") {
                return { ...item };
              }
            })
            .map(section => (
              <Link
                color={
                  props.component === section.title ? "secondary" : "inherit"
                }
                noWrap
                // underline={props.component === section.title ? 'always' : 'none'}
                key={section.title}
                variant="body2"
                href={section.url}
                className={classes.toolbarLink}
              >
                {props.component === section.title ? (
                  <b>
                    {section.title === "CuentaRegresiva"
                      ? "Cuenta Regresiva"
                      : section.title}
                  </b>
                ) : section.title === "CuentaRegresiva" ? (
                  "Cuenta Regresiva"
                ) : (
                  section.title
                )}
              </Link>
            ))}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string
};
