import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 3,
  },
  containerLoading: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.containerLoading}>
        <div className={classes.loading}>
          <CircularProgress />
          <h2>Cargando...</h2>
        </div>
      </div>
    </div>
  );
};

export default Loading;
