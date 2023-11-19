import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const addEllipsis = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Characters = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

  return isLoading ? (
    <div className="loader">Loading ...</div>
  ) : (
    <main>
      <section className="top-bar">
        <div className="page-selection-top-side">
          <div className="page-selection-button-container">
            {currentPage > 2 && (
              <button
                className="page-selection-button first-page-button"
                onClick={() => {
                  setCurrentPage(1);
                }}
              >
                &lt;&lt;&nbsp;&nbsp; FIRST PAGE
              </button>
            )}
          </div>
          <div className="page-selection-button-container">
            {currentPage > 1 && (
              <button
                className="page-selection-button previous-page-button"
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              >
                &lt;&nbsp;&nbsp; PREVIOUS PAGE
              </button>
            )}
          </div>
        </div>
        <div className="search-container">
          <input
            placeholder="Search character(s)"
            className="search-input"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <FontAwesomeIcon icon="search" className="search-input-icon" />
        </div>
        <div className="page-selection-top-side">
          <div className="page-selection-button-container">
            {currentPage < Math.ceil(data.count / 100) && (
              <button
                className="page-selection-button next-page-button"
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              >
                NEXT PAGE &nbsp;&nbsp;&gt;
              </button>
            )}
          </div>
          <div className="page-selection-button-container">
            {currentPage < Math.ceil(data.count / 100) - 1 && (
              <button
                className="page-selection-button last-page-button"
                onClick={() => {
                  setCurrentPage(Math.ceil(data.count / 100));
                }}
              >
                LAST PAGE &nbsp;&nbsp;&gt;&gt;
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="cards-list">
        {data.results.map((character) => {
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
      <section className="page-selection page-selection-bottom">
        <div className="page-selection-button-container">
          {currentPage > 2 && (
            <button
              className="page-selection-button first-page-button"
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              &lt;&lt;&nbsp;&nbsp; FIRST PAGE
            </button>
          )}
        </div>
        <div className="page-selection-button-container">
          {currentPage > 1 && (
            <button
              className="page-selection-button previous-page-button"
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              &lt;&nbsp;&nbsp; PREVIOUS PAGE
            </button>
          )}
        </div>
        <div className="page-selection-button-container">
          {currentPage < Math.ceil(data.count / 100) && (
            <button
              className="page-selection-button next-page-button"
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              NEXT PAGE &nbsp;&nbsp;&gt;
            </button>
          )}
        </div>
        <div className="page-selection-button-container">
          {currentPage < Math.ceil(data.count / 100) - 1 && (
            <button
              className="page-selection-button last-page-button"
              onClick={() => {
                setCurrentPage(Math.ceil(data.count / 100));
              }}
            >
              LAST PAGE &nbsp;&nbsp;&gt;&gt;
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Characters;
