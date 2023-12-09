import { Pagination } from "../../../components/Pagination";
import { moviesType } from "../../../types";
import style from "./filmsPage.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GenreType } from "../../../types";
import { Genere } from "../../Gender/Gender";
import { useState } from "react";

type Props = {
  movies: moviesType[];
};

export function FilmPage({ movies }: Props) {
  console.log("FILMES", movies);

  const navigate = useNavigate();
  const { page, genres } = useParams();

  const navigateToPage = (direction: number) => {
    const currentPageNumber = page ? parseInt(page, 10) : 1;
    const newPageNumber = currentPageNumber + direction;
    if (newPageNumber > 0) {
      navigate(`/films/${newPageNumber}/${genres}`);
    }
  };

  const handleGenreClick = (genereItem: GenreType) => {
    navigate(`/films/1/${genereItem.id}`);
    scrollToTop();
  };

  const IMG = `https://image.tmdb.org/t/p/w500/`;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className={style["container-filmes"]}>
      <div className={style["container-filters"]}>
        <div onClick={toggleMenu} style={{ width: "24px", color: "#fff" }}>
          <i
            className="bi bi-list"
            style={{ fontSize: "24px", color: "#fff",marginLeft:"10px" }}
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
                    navigate(`/detailFilms/${filme.id}`);
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
        ) : null}
      </section>
    </div>
  );
}
