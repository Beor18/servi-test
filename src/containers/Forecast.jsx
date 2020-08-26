import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { WEATHER_KEY, CITY_ID } from "../utils/key";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

import Navbar from "../components/Navbar";
import CardWheather from "../components/Card";

import axios from "../utils/weather";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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

const Forecast = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `forecast?id=${CITY_ID}&APPID=${WEATHER_KEY}&units=metric&lang=es`
      );
      console.log("fer forecast ", result.data.list);
      setItems(get(result, "data.list", []));
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
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
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Navbar />
      {items.map((item, index) => {
        return (
          <Grid item xs={4} key={index}>
            <CardWheather
              time={moment(item.dt_txt)
                .locale("es")
                .format("MMMM Do YYYY, h:mm a")}
              temperatureMin={Math.round(item.main.temp_min)}
              temperatureMax={Math.round(item.main.temp_max)}
              description={item.weather.map((i) => {
                return i.description;
              })}
              humidity={item.main.humidity}
              image={item.weather.map((i) => {
                return i.icon;
              })}
            />
          </Grid>
        );
      })}
      {/* <CardWheather
          time={moment(items.dt_txt).format("DD/MM/YYYY HH:mm")}
          city={items.name + ", CHILE"}
          humidity={items.main.humidity}
          temperatureMin={items.main.temp_min}
          temperatureMax={Math.round(items.main.temp_max)}
        /> */}
    </Grid>
  );
};

export default Forecast;
