import React from "react";
import Link from "@material-ui/core/Link";
import Header from "../Header/Header.jsx";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import AppBarOffset from "../Header/Machetazo.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";

export default class Contacto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header component="Contacto" />
        <AppBarOffset />
        <AppBarOffset />
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                style={{ height: 250, width: "100%" }}
                image="https://drive.google.com/uc?id=1Vb2269-wkE_FEb_aIhw4kNrXJ8cXw6Lv"
                title="Con amor, para Carla"
              />
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={
                        <ListSubheader
                          component="div"
                          id="nested-list-subheader"
                        >
                          Equipo desarrollador:
                        </ListSubheader>
                      }
                      style={{ width: "100%" }}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            src="https://drive.google.com/uc?id=1uVRLNoa3jtS3N4sNjDUY8tyzLPpDKDWq"
                            alt="J"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Juan Diego Marín Rodríguez"
                          secondary="Estudiante de ingeniería de sistemas e informartica"
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" size="small">
                            <Link
                              href="https://twitter.com/black_n01s3?s=09"
                              color="inherit"
                              underline="none"
                              target="_blank"
                            >
                              <TwitterIcon />
                            </Link>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>C</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Carlos Garay Viloria"
                          secondary="Estudiante de diseño grafico"
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" size="small">
                            <Link
                              href="https://twitter.com/LokoGaray?s=09"
                              color="inherit"
                              underline="none"
                              target="_blank"
                            >
                              <TwitterIcon />
                            </Link>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>J</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Juan Andres Salazar Beltran"
                          secondary="Estudiante de ingeniería de sistemas y electronica"
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" size="small">
                            <Link
                              href="https://twitter.com/juannangara?s=09"
                              color="inherit"
                              underline="none"
                              target="_blank"
                            >
                              <TwitterIcon />
                            </Link>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
