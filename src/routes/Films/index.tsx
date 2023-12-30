import { Pagination } from "../../components/Pagination";
import style from "./filmsPage.module.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GenreType } from "../../types";
import { Genere } from "../Gender/Gender";
import { useState } from "react";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";
import { useRequest } from "ahooks";

export function FilmPage() {
  const IMG = `https://image.tmdb.org/t/p/w500/`;
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const genres = searchParams.get("genres") || undefined;
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const {
    data: movies,
    loading,
    error,
  } = useRequest(() => apiMovieService.getAllFilms(Number(page || 1), genres), {
    refreshDeps: [page],
    cacheTime: -1,
  });

  const navigateToPage = (direction: number) => {
    const currentPageNumber = Number(page) || 1;
    const newPageNumber = currentPageNumber + direction;
    if (newPageNumber > 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", String(newPageNumber));
      navigate(`/filmes?${newSearchParams.toString()}`);
    }
  };

  const handleGenreClick = (genereItem: GenreType) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("genres", String(genereItem.id));
    newSearchParams.set("page", "1");
    navigate(`/filmes?${newSearchParams.toString()}`);
    scrollToTop();
  };

  const handleDetailClick = (id: number) => {
    navigate(`/filmes/${id}`);
    scrollToTop();
  };

  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  if (loading) return <LoadingPage />;

  if (error) return <h1>Error</h1>;

  return (
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
          {movies?.map((filme) => (
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
        <div className={style.pagination}>
          <Pagination
            navPages={{
              navigateToPage: navigateToPage,
              scroolTop: scrollToTop,
            }}
          />
        </div>
      </section>
    </div>
  );
}
