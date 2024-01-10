import { useParams, useNavigate } from "react-router-dom";
import { apiMovieService } from "../../services/ServiceApiMovie";
import style from "./detailseries.module.css";
import { BannerHome } from "../../components/Banner/Banner";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";
import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalVideos } from "../../components/ModalVideos";

export function DetailSeriesPage() {
  const IMG_Banner = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/`;
  const URL_LOGO = "https://image.tmdb.org/t/p/w500/";

  const { id } = useParams();
  const [modalIndex, setModalIndex] = useState<number | boolean>(false);

  const closeModal = () => {
    setModalIndex(false);
  };

  const openModal = () => {
    setModalIndex(true);
  };

  useEffect(() => {
    const modalElement = document.getElementById(`staticBackdrop`);

    const handleModalClose = () => {
      closeModal();
    };

    if (modalElement) {
      modalElement.addEventListener("hidden.bs.modal", handleModalClose);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
      }
    };
  }, [modalIndex]);

  const {
    data: detailSeries,
    loading,
    error,
  } = useRequest(() => apiMovieService.getDetailSeries(Number(id)), {
    refreshDeps: [id],
    cacheTime: -1,
  });
  console.log(detailSeries);

  const { data: logo } = useRequest(
    () => apiMovieService.getImagesSeries(Number(id)),
    {
      refreshDeps: [id],
      cacheTime: -1,
    }
  );

  const { data: videos } = useRequest(
    () => apiMovieService.getVideoSeries(Number(id)),
    {
      refreshDeps: [id],
      cacheTime: -1,
    }
  );

  if (videos) console.log("video", videos);

  if (logo) console.log(logo);

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(-1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) return <LoadingPage />;
  if (error) return <h1>Error</h1>;

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
              banner={{ Banner: IMG_Banner + `${detailSeries.backdrop_path}` }}
            />
          </div>
          <div className={style["container-infBg"]}>
            <div className={style["img-logo"]}>
              {logo?.logos[0] ? (
                <img src={URL_LOGO + `${logo.logos[0].file_path}`} alt="" />
              ) : (
                <div>{detailSeries.name}</div>
              )}
            </div>
            {detailSeries.overview ? (
              <span className={style.overwieu}>{detailSeries.overview}</span>
            ) : null}

            <div>
              {videos?.map((item, index) =>
                item.key && videos[0].key
                  ? index === 0 && (
                      <div className={style["contain-video"]} key={item.id}>
                        <button
                          type="button"
                          className="btn btn-primary btn-play d-flex justify-content-start align-items-center p-0  m-0"
                          onClick={() => {
                            openModal();
                          }}
                          data-bs-toggle="modal"
                          data-bs-target={`#staticBackdrop`}
                          style={{
                            background: "rgba(0, 99, 185, 0)",
                            border: "none",
                            fontWeight: "bold",
                            margin: "0 auto",
                          }}
                        >
                          <i
                            className="bi bi-play"
                            style={{
                              fontSize: "30px",
                              margin: "0",
                              padding: "0",
                              color: "rgb(0, 99, 185)",
                            }}
                          ></i>
                          Reproduzir trailer
                        </button>

                        {modalIndex &&
                          createPortal(
                            <ModalVideos
                              video={videos}
                              modalIndex={modalIndex}
                              closeModal={closeModal}
                            />,
                            document.body
                          )}
                      </div>
                    )
                  : null
              )}
            </div>

            <div className={style["img-logo"]}>
              {detailSeries.production_companies[0] ? (
                <img
                  src={
                    URL_LOGO +
                    `${detailSeries.production_companies[0].logo_path}`
                  }
                  alt=""
                  style={{ color: "white" }}
                />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
