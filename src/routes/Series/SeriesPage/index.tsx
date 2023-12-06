import { SeriesType } from "../../../types";
import { useParams, useNavigate } from "react-router-dom";
import style from "./sereies.module.css";
import { Pagination } from "../../../components/Pagination";

type Props = {
  series: SeriesType[];
};

export function SeriesPage({ series }: Props) {
  console.log("NewSeries", series);

  const { page } = useParams();

  const navigate = useNavigate();
  const navigateToPage = (direction: number) => {
    const currentPageNumber = page ? parseInt(page, 10) : 1;
    const newPageNumber = currentPageNumber + direction;
    if (newPageNumber > 0) {
      navigate(`/series/${newPageNumber}/popularity`);
    }
  };

  const IMG = `https://image.tmdb.org/t/p/w500/`;


  const scroolTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={style["container-series"]}>
      <h1>Series</h1>
      <section className={style["section-cards"]}>
        {series.map((serie) =>  serie.poster_path ? (
          <div className={style['container-card']}>
          <div className={style.cards}>
            <img src={IMG + `${serie.poster_path}`} alt="" />
            <span className={style['serie-title']}>{serie.original_name}</span>
          </div>
          <div className={style["card-voted"]}>
          <div className={style['container-voted']}>
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={`svg${i}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  style={{ fill: i <= Math.ceil((serie.vote_average) / 2) ? 'gold' : 'gray' }}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2L14.8 8l6.3.9-4.6 4.5 1.1 6.7-5.8-3-5.8 3 1.1-6.7-4.6-4.5L9.2 2z" />
                </svg>
              ))}
              <span>{serie.vote_average.toFixed(1)}</span>
              </div>
              <span>{serie.original_name}</span>
            </div>
          </div>
        ): null)}
      </section>
      {page ? (
        <div className={style.pagination}>
          <Pagination navPages={{ navigateToPage: navigateToPage, scroolTop: scroolTop }} />
        </div>
      ) : null}
    </div>
  );
}
