import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { seriesDetailsType } from "../../types";
import style from "./detailseries.module.css";
import { BannerHome } from "../../components/Banner/Banner";

export function DetailSeriesPage() {
  const IMG = `https://image.tmdb.org/t/p/w500/`;

  const { serieId } = useParams();
  const [detailSeries, setDetailSeries] = useState<seriesDetailsType>();

  useEffect(() => {
    apiMovieService
      .getDetailSeries(Number(serieId))
      .then((response) => setDetailSeries(response));
  }, [serieId]);
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
          <div>
            <BannerHome
              banner={{ Banner: IMG + `${detailSeries.backdrop_path}`}}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
