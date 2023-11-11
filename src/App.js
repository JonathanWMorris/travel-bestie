import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.js";
import Loading from "./Components/Loading/Loading.js";
import Iteniary from "./Components/Iteniary/Iteniary.js";
import PlaceCard from "./Components/Iteniary/PlaceCard/PlaceCard.js";
import Details from "./Components/Details/Details.js";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/iteniary" element={<Iteniary />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
};

export default App;


