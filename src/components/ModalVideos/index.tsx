import { DetailMovieVideosType } from "../../types";
import style from "./modal.module.css";

type Props = {
  video: DetailMovieVideosType[];
  modalIndex: number | boolean;
  closeModal: () => void;
};

export function ModalVideos({ video, modalIndex, closeModal }: Props) {
  return (
    <div className={style["container-modal"]}>
      {video.map((item, index) =>
        item.key && video[0].key
          ? index == 0 && (
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
                    video[0].key
                  }?si=65IaY8lOB_IyzjUU&start=2${
                    modalIndex ? "&autoplay=1" : ""
                  }`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )
          : null
      )}
    </div>
  );
}
