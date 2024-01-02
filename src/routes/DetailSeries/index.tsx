import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { seriesDetailsType } from "../../types";
import style from "./detailseries.module.css";
import { BannerHome } from "../../components/Banner/Banner";
import { CardMoviesDetails } from "../../components/CardDatails";

export function DetailSeriesPage() {
  const IMG_Banner = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/`;

  const { id } = useParams();
  const [detailSeries, setDetailSeries] = useState<seriesDetailsType>();

  useEffect(() => {
    apiMovieService
      .getDetailSeries(Number(id))
      .then((response) => setDetailSeries(response));
  }, [id]);
  if (detailSeries) console.log("series", detailSeries);

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(-1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {detailSeries ? (
        <div>
          <div className={style.return}>
            <i
              className="bi bi-arrow-left"
              onClick={() => handleCardClick()}
            ></i>
          </div>
          <div className={style["container-banner"]}>
            <BannerHome
              banner={{ Banner: IMG_Banner + `${detailSeries.backdrop_path}` }}
            />
          </div>
          <div className={style["container-infBg"]}>
            <div className={style.card}>
              <CardMoviesDetails series={detailSeries.backdrop_path} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
