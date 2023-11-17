import "../App.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Character = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--t8drhtvqxm4p.code.run/comics/${id}`
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
      <section className="character-comics-list">
        {data.comics.map((comic) => {
          return (
            <div key={comic._id} className="character-comic-card">
              <div className="character-comic-card-picture-details">
                <img
                  src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                  alt="comic image"
                />
                <div className="character-comic-card-details">
                  <p className="character-comic-title">{comic.title}</p>
                  <p className="character-comic-description">
                    {comic.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Character;
