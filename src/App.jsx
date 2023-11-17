import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
// import Favorites from "./pages/Favorites";
// import Comic from "./pages/Comic";

function App() {
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    Cookies.get("favoriteCharacters")
      ? Cookies.get("favoriteCharacters").split("+")
      : []
  );

  const handleFavoriteCharacters = (character_id) => {
    let favoriteCharacters2 = [...favoriteCharacters];
    const index = favoriteCharacters2.indexOf(character_id);
    if (index > -1) {
      favoriteCharacters2.splice(index, 1);
    } else {
      favoriteCharacters2.push(character_id);
    }
    setFavoriteCharacters(favoriteCharacters2);
    Cookies.set("favoriteCharacters", favoriteCharacters2.join("+"), {
      expires: 15,
    });
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route
          path="/character/:id"
          element={
            <Character
              favoriteCharacters={favoriteCharacters}
              handleFavoriteCharacters={handleFavoriteCharacters}
            />
          }
        />
        <Route path="/comics" element={<Comics />} />
        {/* <Route path="/favorites" element={<Favorites />} /> */}
        {/* <Route path="/comics/:characterId" element={<Comics />} /> */}
        {/* <Route path="/comic/:id" element={<Comic />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
