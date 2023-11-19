import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
