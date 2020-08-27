import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { WEATHER_KEY, CITY_ID, lat, lon } from "../utils/key";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
  containerDaily: {
    width: "100%",
  },
  containerTitleDaily: {
    width: "100%",
    padding: 20,
  },
  containerGrid: {
    marginTop: 20,
  },
  containerGridCard: {
    margin: 20,
  },
}));

const Home = () => {
  const [items, setItems] = useState([]);
  const [call, setCall] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `weather?id=${CITY_ID}&APPID=${WEATHER_KEY}&units=metric&lang=es`
      );
      const daily = await axios.get(
        `onecall?lat=${lat}&lon=${lon}&units=metric&lang=es&APPID=${WEATHER_KEY}`
      );

      setItems(get(result, "data", []));
      setCall(get(daily, "data.daily", []));
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
        <Link
          to={`/forecast/${moment(items.dt_txt).format("Do_MMMM")}`}
          key={items}
          style={{ textDecoration: "none" }}
        >
          <CardWheather
            time={moment(items.dt_txt).format("MMMM Do YYYY, h:mm a")}
            city={items.name + ", CHILE"}
            description={items.weather.map((i) => {
              return i.description;
            })}
            button={false}
            humidity={items.main.humidity}
            temperatureMin={Math.round(items.main.temp_min)}
            temperatureMax={Math.round(items.main.temp_max)}
            image={items.weather.map((i) => {
              return i.icon;
            })}
          />
        </Link>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Chart />
      </Grid>
      <Grid container className={classes.containerDaily} spacing={2}>
        <h2 className={classes.containerTitleDaily}>
          Pronostico próximos 5 días
        </h2>
        {call.slice(0, 5).map((item, index) => {
          return (
            <Grid item xs={12} sm={12} md={2} key={index} className={classes.containerGridCard}>
              <div className={classes.containerCard}>
                <Link
                  to={`/forecast/${moment(item.sunrise).format("Do_MMMM")}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <CardWheather
                    time={moment.unix(item.dt).format("Do MMMM")}
                    temperatureMin={Math.round(item.temp.min)}
                    temperatureMax={Math.round(item.temp.max)}
                    description={item.weather.map((i) => {
                      return i.description;
                    })}
                    button={false}
                    humidity={call.humidity}
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
    </Grid>
  );
};

export default Home;
