import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl, Button } from "react-bootstrap";

function App() {
  const [keyword, setKeyword] = useState("");
  const [weather, setWeather] = useState(null);

  const convertCity = async (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/city?q=${keyword}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("new api data", data);
    setWeather(data);
  };

  const getWeatherData = async (lat, lon) => {
    console.log("coord?", lat, lon);
    let url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/coord?lat=${lat}&lon=${lon}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("setWeather", data);
    setWeather(data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      let crd = pos.coords;
      let lat = crd.latitude;
      let lon = crd.longitude;
      getWeatherData(lat, lon);
    });
  }, []);

  return (
    <div>
      <Form inline onSubmit={(e) => convertCity(e)}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
      <h1>Main Page</h1>
      {weather && (
        <>
          <h3>{weather.data.name}</h3>
        </>
      )}
    </div>
  );
}

export default App;
