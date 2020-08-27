import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { WEATHER_KEY, CITY_ID } from "../utils/key";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import moment from "moment";

import CardWheather from "../components/Card";
import Chart from "../components/Chart";
import Loading from "../components/Loading";

import axios from "../utils/weather";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerGrid: {
    marginTop: 20,
  },
}));

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `weather?id=${CITY_ID}&APPID=${WEATHER_KEY}&units=metric&lang=es`
      );
      console.log("fer data ", result.data);
      setItems(get(result, "data", []));
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={12} md={6} className={classes.containerGrid}>
        <CardWheather
          time={moment(items.dt_txt).format("MMMM Do YYYY, h:mm a")}
          city={items.name + ", CHILE"}
          description={items.weather.map((i) => {
            return i.description;
          })}
          humidity={items.main.humidity}
          temperatureMin={Math.round(items.main.temp_min)}
          temperatureMax={Math.round(items.main.temp_max)}
          image={items.weather.map((i) => {
            return i.icon;
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Chart />
      </Grid>
    </Grid>
  );
};

export default Home;
