import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Cookies from "js-cookie";

import Header from "./components/Header";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
// import Comics from "./pages/Comics";
// import Comic from "./pages/Comic";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<Character />} />
        {/* <Route path="/comics/:characterId" element={<Comics />} /> */}
        {/* <Route path="/comic/:id" element={<Comic />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
