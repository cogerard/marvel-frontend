import "../App.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const addEllipsis = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Character = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--t8drhtvqxm4p.code.run/comics/${id}`
        );
        // console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
      <h2>Present in...</h2>
      <section className="cards-list">
        {data.comics.map((comic) => {
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

export default Character;
