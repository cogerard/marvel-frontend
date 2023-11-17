import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--t8drhtvqxm4p.code.run/comics?title=${search}&page=${currentPage}`
        );
        // console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, currentPage]);

  return isLoading ? (
    <div className="loader">Loading ...</div>
  ) : (
    <main>
      <div className="search-container">
        <input
          placeholder="Search comic(s)"
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <section className="comic-cards-list">
        {data.results.map((comic) => {
          return (
            <div key={comic._id} className="comic-card">
              <div className="comic-card-picture-details">
                <img
                  src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                  alt="comic image"
                />
                <div className="comic-card-details">
                  <p className="comic-name">{comic.title}</p>
                  <p className="comic-description">{comic.description}</p>
                </div>
              </div>
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

export default Comics;
