import style from "./midia.module.css";
import { useState, useEffect } from "react";
import { DetailMovieVideosType } from "../../../types";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { apiMovieService } from "../../../services/ServiceApiMovie";
import { Gallery } from "../GalleyPage/gallery";
import { Posteres } from "../PosteresPage/posteres";

interface NavItem {
  id: number;
  name: string;
}

export function MidiaMovies() {
  const [activeItem, setActiveItem] = useState<number | null>(1);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [autoplayIndex, setAutoplayIndex] = useState<number | null>(null);
  const [videos, setVideos] = useState<DetailMovieVideosType[]>([]);

  const navItems: NavItem[] = [
    { id: 1, name: "Videos" },
    { id: 2, name: "Imagens de fundo" },
    { id: 3, name: "Pôsteres" },
  ];

  const isActive = (itemId: number) => {
    return itemId === activeItem;
  };

  const handleItemClick = (itemId: number) => {
    setActiveItem(itemId);
  };

  const closeModal = () => {
    setActiveModalIndex(null);
    setAutoplayIndex(null);
  };

  const openModal = (index: number) => {
    setActiveModalIndex(index);
    setAutoplayIndex(index);
  };

  useEffect(() => {
    const modalElement = document.getElementById(`modal-${activeModalIndex}`);
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
  }, [activeModalIndex]);

  const { id } = useParams();

  useEffect(() => {
    apiMovieService
      .getVideoFilms(Number(id))
      .then((response) => setVideos(response));
  }, [id]);

  return (
    <div className={style["container-Principal"]}>
      <ul>
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            style={{
              cursor: "pointer",
              fontWeight: isActive(item.id) ? "bold" : "normal",
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className={style["container-Principal"]}>
        {activeItem == 1 ? (
          <div className={style["container-videos"]}>
            {videos?.map((videos, index) =>
              videos.key && index != 0 ? (
                <div key={videos.id}>
                  <button
                    type="button"
                    className="btn btn-primary p-1"
                    onClick={() => openModal(index)}
                    data-bs-toggle="modal"
                    data-bs-target={`#modal-${index}`}
                    style={{
                      background: "rgba(0, 99, 185, 0)",
                      border: "none",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className={style["modal-image"]}
                      src={`https://img.youtube.com/vi/${videos.key}/hqdefault.jpg`}
                      alt=""
                    />
                    <span>{videos.name}</span>
                  </button>

                  {activeModalIndex === index &&
                    createPortal(
                      <div
                        className={style["container-modal"]}
                        id={`modal-${index}`}
                        aria-labelledby={`staticBackdropLabel-${index}`}
                        tabIndex={-1}
                      >
                        <div className={style.modal}>
                          <button
                            onClick={() => closeModal()}
                            className={style["modal-buttom"]}
                          >
                            X
                          </button>
                          <iframe
                            width="100%"
                            height="700"
                            src={`https://www.youtube.com/embed/${
                              videos.key
                            }?si=65IaY8lOB_IyzjUU&start=2${
                              autoplayIndex === index ? "&autoplay=1" : ""
                            }`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>,
                      document.body
                    )}
                </div>
              ) : null
            )}
          </div>
        ) : activeItem == 2 ? (
          <div>
            <Gallery />
          </div>
        ) : activeItem == 3 ? (
          <div>
            <Posteres />
          </div>
        ) : null}
      </div>
    </div>
  );
}
