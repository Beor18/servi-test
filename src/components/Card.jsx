import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 12,
    marginBottom: 12,
  },
  temp: {
    fontWeight: 600,
  },
});

const CardWheather = ({
  time,
  city,
  temperatureMin,
  temperatureMax,
  humidity,
  image,
  description,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {time}
        </Typography>
        <Typography variant="h5" component="h2">
          {city}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <span className={classes.temp}>Mínima: </span> {temperatureMin}°C
          <br />
          <span className={classes.temp}>Máxima: </span> {temperatureMax}°C
          <br />
          <span className={classes.temp}> Humedad: </span> {humidity}%
        </Typography>
        <img
          src={`http://openweathermap.org/img/wn/${image}.png`}
          alt="clima"
        />
        <Typography variant="body2" component="p">
          {description} <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver Más</Button>
      </CardActions>
    </Card>
  );
};

export default CardWheather;
