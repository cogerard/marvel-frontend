import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const addEllipsis = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Comics = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--t8drhtvqxm4p.code.run/comics?title=${search}&page=${currentPage}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, currentPage]);

  const [favoriteComics, setFavoriteComics] = useState(
    Cookies.get("favoriteComics")
      ? Cookies.get("favoriteComics").split("+")
      : []
  );

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
            placeholder="Search comic(s)"
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
        {data.results.map((comic) => {
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

export default Comics;
