import style from "./homepage.module.css";
import { moviesType } from "../../../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarouseMovies } from "../../../components/CarouselMovie";

type Props = {
  movies: moviesType[];
  topMovies: moviesType[];
  soonRelease: moviesType[];
};

export function HomePage({ movies, topMovies, soonRelease }: Props) {
  const URL = "https://image.tmdb.org/t/p/w500/";

  const [Banner, setBanner] = useState(`${URL + movies[0].backdrop_path}`);
  const navigate = useNavigate();

  const [currentMovie, setCurrentMovie] = useState<moviesType>(movies[0]);

  const [scrollx, setScrollx] = useState(0);

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
        x = window.innerWidth - listW - 120;
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

  return (
    <>
      <div className={`${style.banner}`}>
        <img src={`${URL + Banner}`} alt="" />
        <div className={style["banner-bg"]}>
          <div className={style["banner-info"]}>
            <h1 className={style.title}>{currentMovie.title}</h1>
            <span>{currentMovie.release_date}</span>
          </div>
        </div>
      </div>

      <div className={style["container-home"]}>
        <div className={style["movieRow-left"]}>
          <i
            className="bi bi-chevron-left"
            style={{ fontSize: "28px", color: "#ddd" }}
            onClick={handleLeftArrow}
          ></i>
        </div>
        <div className={style["movieRow-right"]}>
          <i
            className="bi bi-chevron-right"
            style={{ fontSize: "28px", color: "#fff" }}
            onClick={handleRightArrow}
          ></i>
        </div>

        <div className={style["home-listArea"]}>
          <div
            className={style["home-list"]}
            style={{
              marginLeft: scrollx,
              width: movies.length * 300,
              ...(window.innerWidth < 600 && { width: movies.length * 150 }),
            }}
          >
            {movies.map((moviesItem: moviesType) => (
              <div
                onClick={() => navigate(`/detailFilms/${moviesItem.id}`)}
                className={style.card}
                key={moviesItem.id}
                onMouseEnter={() => {
                  setBanner(moviesItem.backdrop_path);
                  setCurrentMovie(moviesItem);
                }}
              >
                <img
                  className=""
                  src={`${URL + moviesItem.poster_path}`}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className={style.topMoviesSection}>
        <h1>Top 20 movies</h1>
        <CarouseMovies movies={topMovies} />
      </section>

      <section className={style.lancamento}>
        <h1>Breve Lançamento</h1>
        <CarouseMovies movies={soonRelease}/>
      </section>
    </>
  );
}
