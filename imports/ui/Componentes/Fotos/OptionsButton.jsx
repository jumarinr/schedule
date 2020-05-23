import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import UpdateIcon from "@material-ui/icons/Update";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

export default function OptionsButton(props) {
  const [options] = React.useState([
    {
      titulo: "Obtener imagenes al azar",
      icon: <UpdateIcon />,
      method: "getHubbleRecomendations"
    },
    {
      titulo: "Ver fotos",
      icon: <PhotoLibraryIcon />,
      method: "actualizarListadoFotos"
    },
    {
      titulo: "Agregar foto",
      method: "openModalAddPhoto",
      icon: <AddPhotoAlternateIcon />
    }
  ]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = selected => {
    console.log(typeof selected);
    if (typeof selected === "number" || selected === 0) {
      const method = options[selected].method;
      console.log(method);
      if (method) {
        props[`${method}`]();
      }
    } else {
      const method = options[selectedIndex].method;
      if (method) {
        props[`${method}`]();
      }
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    handleClick(index);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid item xs={12}>
      <ButtonGroup
        variant="contained"
        color="secondary"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          disabled={props.loading}
          onClick={handleClick}
          startIcon={options[selectedIndex].icon}
        >
          <div style={{ textTransform: "capitalize", fontSize: "80%" }}>
            {options[selectedIndex].titulo}
          </div>
        </Button>
        <Button
          color="secondary"
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          disabled={props.loading}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      // disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      <ListItemIcon>{option.icon}</ListItemIcon>

                      {option.titulo}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
}
