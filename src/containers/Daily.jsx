import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { WEATHER_KEY, CITY_ID } from "../utils/key";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Loading from "../components/Loading";
import CardWheather from "../components/Card";

import axios from "../utils/weather";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'absolute',
    width: "100%",
    height: "70%",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Daily = ({ match }) => {
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

  const daily = items.find((e) => (e.dt_txt = match.params.id)) || [];

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <div className={classes.container}>
        <CardWheather
          time={daily.dt_txt}
          button={false}
          description={daily.weather[0].description}
          humidity={daily.main.humidity}
          temperatureMin={Math.round(daily.main.temp_min)}
          temperatureMax={Math.round(daily.main.temp_max)}
          image={daily.weather.map((i) => {
            return i.icon;
          })}
        />
      </div>
    </Grid>
  );
};

export default Daily;
