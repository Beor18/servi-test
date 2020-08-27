import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import { WEATHER_KEY, CITY_ID } from "../utils/key";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import moment from "moment";

import Loading from "../components/Loading";
import CardWheather from "../components/Card";

import axios from "../utils/weather";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerCard: {
    marginTop: 20,
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
      setItems(get(result, "data.list", []));
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      {items.map((item, index) => {
        return (
          <Grid item xs={12} sm={12} md={4} key={index}>
            <div className={classes.containerCard}>
              <Link
                to={`/forecast/${moment(item.dt_txt).format("Do_MMMM")}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <CardWheather
                  time={moment(item.dt_txt)
                    .locale("es")
                    .format("MMMM Do YYYY, h:mm a")}
                  temperatureMin={Math.round(item.main.temp_min)}
                  temperatureMax={Math.round(item.main.temp_max)}
                  description={item.weather.map((i) => {
                    return i.description;
                  })}
                  button={false}
                  humidity={item.main.humidity}
                  image={item.weather.map((i) => {
                    return i.icon;
                  })}
                />
              </Link>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Forecast;
