import style from "./DetailFilms.module.css";
import { createPortal } from "react-dom";
import { DetailsMovie } from "../../../types";
import { BannerHome } from "../../../components/Banner/Banner";
import { useNavigate } from "react-router-dom";
import { Collection } from "../../../components/Collection";
import { useState, useEffect } from "react";
import { DetailMovieVideosType } from "../../../types";
import { MidiaMovies } from "../../../components/Midia/Midia";
import { ModalMovie } from "../../../components/ModalMovies";

type Props = {
  filmDetails: DetailsMovie;
  filmDetailVideos: DetailMovieVideosType[];
};

export function DetailFilmsPage({ filmDetails, filmDetailVideos }: Props) {
  const IMG = `https://image.tmdb.org/t/p/w500/`;

  const navigate = useNavigate();

  const [duracaoFormatada, setDuracaoFormatada] = useState("");

  const formatarDuracao = (duracaoEmMinutos: number) => {
    const horas = Math.floor(duracaoEmMinutos / 60);
    const minutos = duracaoEmMinutos % 60;
    return `${horas}h ${minutos}min`;
  };

  useEffect(() => {
    setDuracaoFormatada(formatarDuracao(filmDetails.runtime));
  }, [filmDetails.runtime]);

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

  return (
    <div className={style["container-DetailFilms"]}>
      <div className={style.return}>
        <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i>
      </div>
      <div>
        <BannerHome banner={{ Banner: IMG + `${filmDetails.backdrop_path}` }} />
        <section className={style["contain-bg"]}>
          <div className={style.description}>
            <div>
              <img src={IMG + `${filmDetails.poster_path}`} alt="" />
            </div>
            <div className={style.info}>
              <h1>
                {filmDetails.title} ({filmDetails.release_date})
              </h1>

              {filmDetailVideos.map((item, index) =>
                item.key && filmDetailVideos[0].key
                  ? index === 1 && (
                      <div key={item.id}>
                        <button
                          type="button"
                          className="btn btn-primary p-1"
                          onClick={() => {
                            openModal();
                          }}
                          data-bs-toggle="modal"
                          data-bs-target={`#staticBackdrop`}
                          style={{
                            background: "rgba(0, 99, 185, 0)",
                            border: "none",
                            fontWeight: "bold",
                          }}
                        >
                          <i
                            className="bi bi-play"
                            style={{ fontSize: "22px" }}
                          ></i>
                          Reproduzir trailer
                        </button>

                        {modalIndex &&
                          createPortal(
                            <ModalMovie  video={filmDetailVideos} modalIndex={modalIndex} closeModal={closeModal}/>,
                            document.body
                          )}
                      </div>
                    )
                  : null
              )}

              <p>{filmDetails.tagline}</p>
              <div>
                <span className={style.timer}> {duracaoFormatada}</span>
                <i className="bi bi-alarm-fill">
                  {" "}
                  <strong>|</strong>{" "}
                </i>
                <span>{filmDetails.genres[0].name} </span>
              </div>
            </div>
          </div>
        </section>
        <div className={style["more-Details"]}>
          <div className={style.dados}>
            <span>{`Titulo original: ${filmDetails.original_title}`}</span>
            <span>{`Situação: ${filmDetails.status}`}</span>
            <span>{`Idioma original: ${filmDetails.spoken_languages[0].name}`}</span>
            <span>{`Orçamento:  $${filmDetails.budget.toLocaleString()}`}</span>
            <span>{`Receita: $${filmDetails.revenue.toLocaleString()}`}</span>
          </div>
        </div>
        <div className={style.sinopse}>
                <h1>Sinopse</h1>
                <p>{filmDetails.overview}</p>
              </div>
      </div>
      <div>
        <MidiaMovies videos={filmDetailVideos} />
      </div>
      <div>
            {filmDetails.belongs_to_collection?.id ? (
              <Collection
                CollectionId={{ id: filmDetails.belongs_to_collection.id }}
              />
            ) : null}
          </div>
    </div>

  );
}
