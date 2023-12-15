import { Pagination } from "../../components/Pagination";
import { moviesType } from "../../types";
import style from "./filmsPage.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GenreType } from "../../types";
import { Genere } from "../Gender/Gender";
import { useEffect, useState } from "react";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";

export function FilmPage() {
  const IMG = `https://image.tmdb.org/t/p/w500/`;
  const { page, genres } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<moviesType[]>([]);

  useEffect(() => {
    apiMovieService
      .getAllFilms(Number(page), genres)
      .then((response) => setMovies(response));
  }, [page]);

  const navigateToPage = (direction: number) => {
    const currentPageNumber = page ? parseInt(page, 10) : 1;
    const newPageNumber = currentPageNumber + direction;
    if (newPageNumber > 0) {
      const genresParam = genres ? `${genres}` : "";
      navigate(`/films/${newPageNumber}/${genresParam}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDetailClick = (id: number) => {
    navigate(`/detailFilms/${id}`);
    scrollToTop();
  };

  const handleGenreClick = (genereItem: GenreType) => {
    navigate(`/films/1/${genereItem.id}`);
    scrollToTop();
  };

  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div>
      {movies ? (
        <div className={style["container-filmes"]}>
          <div className={style["container-filters"]}>
            <div onClick={toggleMenu} style={{ width: "24px", color: "#fff" }}>
              <i
                className="bi bi-list"
                style={{ fontSize: "24px", color: "#fff", marginLeft: "10px" }}
              ></i>
            </div>
            <div>
              {menuAberto && (
                <div>
                  <Genere onGenreClick={handleGenreClick} />
                </div>
              )}
            </div>
          </div>
          <section className={style["section-cards"]}>
            <div className={style["container-card"]}>
              {movies.map((filme) => (
                <div className={style["list-cards"]}>
                  <div className={style["card-itens"]}>
                    <div
                      className={style.card}
                      onClick={() => {
                        handleDetailClick(filme.id);
                      }}
                    >
                      <img src={IMG + `${filme.poster_path}`} alt="" />
                    </div>
                    <div className={style["card-voted"]}>
                      <div>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg
                            key={`svg${i}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            style={{
                              fill:
                                i <= Math.ceil(filme.vote_average / 2)
                                  ? "gold"
                                  : "gray",
                            }}
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 2L14.8 8l6.3.9-4.6 4.5 1.1 6.7-5.8-3-5.8 3 1.1-6.7-4.6-4.5L9.2 2z" />
                          </svg>
                        ))}
                        <span>{filme.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {page ? (
              <div className={style.pagination}>
                <Pagination
                  navPages={{
                    navigateToPage: navigateToPage,
                    scroolTop: scrollToTop,
                  }}
                />
              </div>
            ) : (
              <LoadingPage />
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
