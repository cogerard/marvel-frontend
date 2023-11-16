import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--t8drhtvqxm4p.code.run/characters"
        );
        console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loader">Loading ...</div>
  ) : (
    <main>
      <section className="character-cards-list">
        {data.results.map((character) => {
          return (
            <Link key={character._id} to={`/characters/${character._id}/`}>
              <div className="character-card">
                <div className="character-card-picture-details">
                  <img
                    src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                    alt="character image"
                  />
                  <div className="character-card-details">
                    <p className="name">{character.name}</p>
                    <p className="description">{character.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
      <div className="characters-page-selection"></div>
    </main>
  );
};

export default Characters;
