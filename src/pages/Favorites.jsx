import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const addEllipsis = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [favoriteCharacters, setFavoriteCharacters] = useState(
    Cookies.get("favoriteCharacters")
      ? Cookies.get("favoriteCharacters").split("+")
      : []
  );
  const [favoriteCharactersWithDetails, setfavoriteCharactersWithDetails] =
    useState([]);

  const [favoriteComics, setFavoriteComics] = useState(
    Cookies.get("favoriteComics")
      ? Cookies.get("favoriteComics").split("+")
      : []
  );
  const [favoriteComicsWithDetails, setfavoriteComicsWithDetails] = useState(
    []
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchData = async () => {
      try {
        let favoriteCharactersWithDetails2 = [];
        for (let i = 0; i < favoriteCharacters.length; i++) {
          const response = await axios.get(
            `https://site--marvel-backend--t8drhtvqxm4p.code.run/character/${favoriteCharacters[i]}`
          );
          favoriteCharactersWithDetails2.push(response.data);
        }
        // console.log(favoriteCharactersWithDetails2);
        setfavoriteCharactersWithDetails(favoriteCharactersWithDetails2);

        let favoriteComicsWithDetails2 = [];
        for (let i = 0; i < favoriteComics.length; i++) {
          const response = await axios.get(
            `https://site--marvel-backend--t8drhtvqxm4p.code.run/comic/${favoriteComics[i]}`
          );
          favoriteComicsWithDetails2.push(response.data);
        }
        // console.log(favoriteComicsWithDetails2);
        setfavoriteComicsWithDetails(favoriteComicsWithDetails2);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [favoriteCharacters, favoriteComics]);

  const handleFavoriteCharacters = (characterId) => {
    let favoriteCharacters2 = [...favoriteCharacters];
    const index = favoriteCharacters2.indexOf(characterId);
    if (index > -1) {
      favoriteCharacters2.splice(index, 1);
    } else {
      favoriteCharacters2.push(characterId);
    }
    setFavoriteCharacters(favoriteCharacters2);
    Cookies.set("favoriteCharacters", favoriteCharacters2.join("+"), {
      expires: 15,
    });
  };

  const handleFavoriteComics = (comicId) => {
    let favoriteComics2 = [...favoriteComics];
    const index = favoriteComics2.indexOf(comicId);
    if (index > -1) {
      favoriteComics2.splice(index, 1);
    } else {
      favoriteComics2.push(comicId);
    }
    setFavoriteComics(favoriteComics2);
    Cookies.set("favoriteComics", favoriteComics2.join("+"), {
      expires: 15,
    });
  };

  return isLoading ? (
    <div className="loader">Loading ...</div>
  ) : (
    <main>
      <h2>My Favorite Characters</h2>
      <section className="cards-list favorites-section">
        {favoriteCharactersWithDetails.map((character) => {
          return (
            <div key={character._id} className="card">
              <Link to={`/character/${character._id}/`}>
                <div className="card-picture-details">
                  <p className="name">{addEllipsis(character.name, 20)}</p>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt="character image"
                  />
                  <p className="description">
                    {addEllipsis(character.description, 90)}
                  </p>
                </div>
              </Link>
              <div className="favorite">
                {!favoriteCharacters.includes(character._id) ? (
                  <button
                    className="add-favorite"
                    onClick={() => handleFavoriteCharacters(character._id)}
                  >
                    Add to Favorites
                  </button>
                ) : (
                  <button
                    className="remove-favorite"
                    onClick={() => handleFavoriteCharacters(character._id)}
                  >
                    Remove from Favorites
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>
      <h2 className="favorites-page-comics-title">My Favorite Comics</h2>
      <section className="cards-list favorites-section">
        {favoriteComicsWithDetails.map((comic) => {
          return (
            <div key={comic._id} className="card comic-card">
              <div className="card-picture-details">
                <p className="name">{addEllipsis(comic.title, 20)}</p>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt="comic image"
                />
                <p className="description">
                  {comic.description && addEllipsis(comic.description, 90)}
                </p>
              </div>
              <div className="favorite">
                {!favoriteComics.includes(comic._id) ? (
                  <button
                    className="add-favorite"
                    onClick={() => handleFavoriteComics(comic._id)}
                  >
                    Add to Favorites
                  </button>
                ) : (
                  <button
                    className="remove-favorite"
                    onClick={() => handleFavoriteComics(comic._id)}
                  >
                    Remove from Favorites
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Favorites;
