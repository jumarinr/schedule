export default PerfilStyle = theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});
