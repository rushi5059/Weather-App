import React from "react";
import Weather from "./components/WeatherCard";
import "../src/components/css/Weather.css";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Weather />
    </div>
  );
}

export default App;
