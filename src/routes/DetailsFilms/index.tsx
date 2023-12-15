import { useParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import style from "./DetailFilms.module.css";
import { useEffect, useState } from "react";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { DetailMovieVideosType, DetailsMovie } from "../../types";
import { BannerHome } from "../../components/Banner/Banner";
import { ModalMovie } from "../../components/ModalMovies";
import { MidiaMovies } from "../../components/Midia/Midia";
import { Collection } from "../../components/Collection";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";

interface RouteParams {
  filmId?: string;
  [key: string]: string | undefined;
}

export function DetailFilmsPage() {
  let { filmId } = useParams<RouteParams>();
  const [filmDetails, setFilmDetails] = useState<DetailsMovie>();
  const [filmDetailVideos, setFilmDetailVideos] =
    useState<DetailMovieVideosType[]>();
  const navigate = useNavigate();
  const IMG = `https://image.tmdb.org/t/p/w500/`;
  const [duracaoFormatada, setDuracaoFormatada] = useState("");
  const [modalIndex, setModalIndex] = useState<number | boolean>(false);
  const [carregado, setCarregado] = useState(false);

  console.log(carregado)

  const formatarDuracao = (duracaoEmMinutos: number) => {
    const horas = Math.floor(duracaoEmMinutos / 60);
    const minutos = duracaoEmMinutos % 60;
    return `${horas}h ${minutos}min`;
  };

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

  const handleCardClick = () => {
    navigate(-1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setDuracaoFormatada(formatarDuracao(Number(filmDetails?.runtime)));
  }, [filmDetails?.runtime]);

  if (filmId !== undefined) {
    const filmIdNumber: number = parseInt(filmId, 10);
    useEffect(() => {
      apiMovieService
        .getDetailsFilmes(filmIdNumber)
        .then((response) => setFilmDetails(response));
        setCarregado(true);
    }, [filmId]);
  }

  useEffect(() => {
    setDuracaoFormatada(formatarDuracao(Number(filmDetails?.runtime)));
  }, [filmDetails?.runtime]);

  if (filmId !== undefined) {
    const filmIdNumber: number = parseInt(filmId, 10);
    useEffect(() => {
      apiMovieService
        .getVideoFilms(filmIdNumber)
        .then((response) => setFilmDetailVideos(response));
    }, [filmId]);
  }

  return (
    <div>
      {filmDetails ? (
        <div className={style["container-DetailFilms"]}>
          <div className={style.return}>
            <i
              className="bi bi-arrow-left"
              onClick={() => handleCardClick()}
            ></i>
          </div>
          <div>
            <BannerHome
              banner={{ Banner: IMG + `${filmDetails?.backdrop_path}` }}
            />
            <section className={style["contain-bg"]}>
              <div className={style.description}>
                <div>
                  <img src={IMG + `${filmDetails?.poster_path}`} alt="" />
                </div>
                <div className={style.info}>
                  <h1>
                    {filmDetails?.title} ({filmDetails?.release_date})
                  </h1>
                  <p>{filmDetails?.tagline}</p>
                  <div>
                    <span className={style.timer}> {duracaoFormatada}</span>
                    <i className="bi bi-alarm-fill">
                      {" "}
                      <strong>|</strong>{" "}
                    </i>
                    <span>{filmDetails.genres[0].name} </span>
                  </div>
                  {filmDetailVideos?.map((item, index) =>
                    item.key && filmDetailVideos[0].key
                      ? index === 1 && (
                          <div key={item.id}>
                            <button
                              type="button"
                              className="btn btn-primary p-1 btn-play d-flex justify-content-center align-items-center p-0"
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
                                <ModalMovie
                                  video={filmDetailVideos}
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
              </div>
            </section>
            {filmDetails.overview ? (
              <div className={style.sinopse}>
                <h1>Sinopse</h1>
                <p>{filmDetails.overview}</p>
              </div>
            ) : null}
          </div>
          <div>
            <MidiaMovies  />
          </div>
          <div>
            {filmDetails.belongs_to_collection?.id ? (
              <Collection
                CollectionId={{ id: filmDetails.belongs_to_collection.id }}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div><LoadingPage /></div>
      )}
    </div>
  );
}
