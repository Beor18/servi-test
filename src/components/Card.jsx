import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  containerCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 275,
  },
  content: {
    padding: "15px",
  },
  title: {
    fontWeight: 300,
    fontSize: 20,
  },
  pos: {
    marginTop: 12,
    marginBottom: 12,
  },
  temp: {
    fontWeight: 600,
  },
  image: {
    display: "flex",
    padding: "15px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: ({ button }) => {
    return {
      display: button ? "block" : "none",
    };
  },
});

const CardWheather = ({
  button = true,
  time,
  city,
  temperatureMin,
  temperatureMax,
  humidity,
  image,
  id,
  description,
}) => {
  const classes = useStyles({
    button,
  });

  return (
    <Card className={classes.containerCard}>
      <CardContent className={classes.containerCard}>
        <div className={classes.content}>
          <Typography
            className={classes.title}
            color="textSecondary"
            variant="h5"
            component="h5"
            gutterBottom
          >
            {time}
          </Typography>
          <Typography variant="h5" component="h5">
            {city}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <span className={classes.temp}>Mínima: </span> {temperatureMin}°C
            <br />
            <span className={classes.temp}>Máxima: </span> {temperatureMax}°C
            <br />
            <span className={classes.temp}> Humedad: </span> {humidity}%
          </Typography>
        </div>
        <div className={classes.image}>
          <img
            src={`http://openweathermap.org/img/wn/${image}.png`}
            alt="clima"
          />
          <Typography variant="body2" component="p">
            {description} <br />
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" href={id} className={classes.button}>
          Ver Más
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardWheather;
