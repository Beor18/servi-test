import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch("/");

  return (
    <AppBar position="sticky">
      <Toolbar>
      <Typography variant="h6" className={classes.title}>
          ServiSenior Test
        </Typography>
        <Button color="inherit" onClick={() => history.push("/")}>
          {match && "Inicio"}
        </Button>
        <Button color="inherit" onClick={() => history.push("/forecast")}>
          {match && "Pronostico de cada 3 Horas"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
