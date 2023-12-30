import styles from "./carouselMovie.module.css";
import { moviesType } from "../../types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { ContextPage } from "../../Context/ContextPage";

type Props = {
  movies: moviesType[];
};

export function CarouseMovies({ movies }: Props) {

  const context = useContext(ContextPage);


  const URL = "https://image.tmdb.org/t/p/w500/";
  const navigate = useNavigate();

  const [scrollx, setScrollx] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleLeftArrow = () => {
    let x = scrollx + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollx(x);
  };

  const handleRightArrow = () => {
    if (window.innerWidth < 600) {
      let x = scrollx - Math.round(window.innerWidth / 2);

      let listW = movies.length * 150;
      if (window.innerWidth - listW > x) {
        x = window.innerWidth - listW - 30;
      }
      setScrollx(x);
    } else {
      let x = scrollx - Math.round(window.innerWidth / 2);

      let listW = movies.length * 300;
      if (window.innerWidth - listW > x) {
        x = window.innerWidth - listW - 60;
      }
      setScrollx(x);
    }
  };

  const handleCardClick  = (id: number) => {
    navigate(`/filmes/${id}`)
    context?.scrollTop()
  };

  return (
    <div className={styles.movieRow}>

      <div className={styles["movieRow-left"]}>
        <i
          className="bi bi-chevron-left"
          style={{ fontSize: "24px", color: "#fff" }}
          onClick={handleLeftArrow}
        ></i>
      </div>
      <div className={styles["movieRow-right"]}>
        <i
          className="bi bi-chevron-right"
          style={{ fontSize: "24px", color: "#fff" }}
          onClick={handleRightArrow}
        ></i>
      </div>

      <div className={styles["movieRow-listArea"]}>
        <div
          className={styles["movieRow-list"]}
          style={{
            marginLeft: scrollx,
            width: windowWidth < 600 ? movies.length * 150 : movies.length * 300,
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className={styles["movieRow-item"]} onClick={()=> handleCardClick(movie.id)}>
              <img src={URL + `${movie.poster_path}`} alt="" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
