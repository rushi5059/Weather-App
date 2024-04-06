import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#87CEEB", // Sky blue background color
  },
  title: {
    flexGrow: 1,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  weatherIcon: {
    fontSize: "24px",
    marginRight: "5px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=XXX"
        );
        const data = await response.json();
        const weatherCondition =
          data.data.values.cloudCover > 50 ? "cloud" : "sun";
        setWeatherIcon(weatherCondition);
        setLocation("Toronto");
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Weather App
        </Typography>
        <div className={classes.iconContainer}>
          <Typography
            variant="body1"
            color="inherit"
            style={{ marginRight: "10px" }}>
            {location}
          </Typography>
          {weatherIcon === "sun" && (
            <WbSunnyOutlinedIcon className={classes.weatherIcon} />
          )}
          {weatherIcon === "cloud" && (
            <CloudOutlinedIcon className={classes.weatherIcon} />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
