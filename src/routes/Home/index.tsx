import style from "./homepage.module.css";
import { moviesType } from "../../types";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CarouseMovies } from "../../components/CarouselMovie";
import { ContextPage } from "../../Context/ContextPage";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { useRequest } from "ahooks";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";

export function HomePage() {
  const URL = "https://image.tmdb.org/t/p/w500/";
  const URL_BANNER = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/`;
  const [movies, setMovies] = useState<moviesType[]>([]);
  const [topMovies, setTopMovies] = useState<moviesType[]>([]);
  const [soonRelease, setSoonRelease] = useState<moviesType[]>([]);
  const [currentMovie, setCurrentMovie] = useState<moviesType>(movies[0]);
  const [Banner, setBanner] = useState<string | undefined>(
    movies.length > 0 ? `${URL_BANNER + movies[0]?.backdrop_path}` : undefined
  );

  const {
    data: images,
    loading,
    error,
  } = useRequest(() => apiMovieService.getImagesMovies(currentMovie.id), {
    refreshDeps: [currentMovie],
    cacheTime: -1,
  });

  const { data: seriesNetflix } = useRequest(
    () => apiMovieService.getOriginaisNetflix(),
    {
      refreshDeps: [],
      cacheTime: -1,
    }
  );

  console.log("series", seriesNetflix)

  useEffect(() => {
    if (movies.length > 0) {
      setBanner(`${URL_BANNER + movies[0]?.backdrop_path}`);
      setCurrentMovie(movies[0]);
    }
  }, [movies]);

  const [scrollx, setScrollx] = useState(0);

  useEffect(() => {
    apiMovieService.getMovies().then((Response) => setMovies(Response));
  }, []);

  useEffect(() => {
    apiMovieService.getTopFilms().then((Response) => setTopMovies(Response));
  }, []);

  useEffect(() => {
    apiMovieService
      .getSoonRelease()
      .then((Response) => setSoonRelease(Response));
  }, []);

  const handleLeftArrow = () => {
    if (window.innerWidth < 600) {
      let x = scrollx + Math.round(window.innerWidth / 1.07);
      if (x > 0) {
        x = 0;
      }
      setScrollx(x);
    } else {
      let x = scrollx + Math.round(window.innerWidth / 2);
      if (x > 0) {
        x = 0;
      }
      setScrollx(x);
    }
  };

  const handleRightArrow = () => {
    if (window.innerWidth < 600) {
      let x = scrollx - Math.round(window.innerWidth / 1.07);

      let listW = movies.length * 550;
      if (window.innerWidth - listW > x) {
        x = window.innerWidth - listW - 60;
      }
      setScrollx(x);
    } else {
      let x = scrollx - Math.round(window.innerWidth / 2);

      let listW = movies.length * 300;
      if (window.innerWidth - listW > x) {
        x = window.innerWidth - listW - 120;
      }
      setScrollx(x);
    }
  };

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

  const navigate = useNavigate();
  const context = useContext(ContextPage);

  const handleCardClick = (id: number) => {
    navigate(`/filmes/${id}`);
    context?.scrollTop();
  };

  if (loading) return <LoadingPage />;
  if (error) return <h1>Error</h1>;

  return (
    <>
      <div className={style.banner}>
        <img
          src={`${URL_BANNER + Banner}`}
          alt="imagem bannder do filme"
          className={style["banner-home"]}
        />
        <div className={style["banner-bg"]}>
          <div>
            {images?.logos
              .slice(0, 1)
              .map((logo) =>
                logo.file_path ? (
                  <img
                    src={URL + `${logo.file_path}`}
                    alt="imagem nome do filme"
                    className={style["logo-img"]}
                  />
                ) : null
              )}
          </div>
          <div className={style["banner-info"]}>
            <h1 className={style?.title}>{currentMovie?.title}</h1>
            <span>{currentMovie?.release_date}</span>
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
              width:
                windowWidth < 600 ? movies.length * 550 : movies.length * 300,
            }}
          >
            {movies.map((moviesItem: moviesType) => (
              <div
                onClick={() => handleCardClick(moviesItem.id)}
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
        <CarouseMovies movies={soonRelease} />
      </section>

      <section className={style.lancamento}>
        <h1>Originais Netflix</h1>
        <CarouseMovies series={seriesNetflix} />
      </section>
    </>
  );
}
