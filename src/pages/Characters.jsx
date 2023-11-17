import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Characters = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--t8drhtvqxm4p.code.run/characters?name=${search}&page=${currentPage}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, currentPage]);

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

  return isLoading ? (
    <div className="loader">Loading ...</div>
  ) : (
    <main>
      <div className="search-container">
        <input
          placeholder="Search character(s)"
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <section className="character-cards-list">
        {data.results.map((character) => {
          return (
            <div key={character._id} className="character-card">
              <Link to={`/character/${character._id}/`}>
                <div className="character-card-picture-details">
                  <img
                    src={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
                    alt="character image"
                  />
                  <div className="character-card-details">
                    <p className="character-name">{character.name}</p>
                    <p className="character-description">
                      {character.description}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                className="character-favorite"
                onClick={() => handleFavoriteCharacters(character._id)}
              >
                Favorite ?
              </button>
              {favoriteCharacters.includes(character._id) && (
                <span>Favorite</span>
              )}
            </div>
          );
        })}
      </section>
      <section className="page-selection">
        <div className="first-page">
          {currentPage !== 1 && (
            <button
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              First
            </button>
          )}
        </div>
        <div className="previous-page">
          {currentPage > 2 && (
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </button>
          )}
        </div>
        <div className="next-page">
          {currentPage < Math.ceil(data.count / 100) - 1 && (
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
        <div className="last-page">
          {currentPage !== Math.ceil(data.count / 100) && (
            <button
              onClick={() => {
                setCurrentPage(Math.ceil(data.count / 100));
              }}
            >
              Last
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Characters;
