import { GalleryType } from "../../types";
import style from "./gallery.module.css";
import { BannerHome } from "../Banner/Banner";

type Props = {
  images: GalleryType | undefined;
};

export function GalleryEl({ images }: Props) {
  if (images) console.log(images);
  const URL_IMG = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className={style["container-gallery"]}>
      <h1>Planos de Fundo</h1>
      <div style={{width: "100%"}}>
        <BannerHome banner={{ Banner: URL_IMG + `${images?.backdrops[1].file_path}`}} />
      </div>
      <div className={style["container-gallery"]}>
        {images
          ? images.posters.map((poster) => (
              <div className={style["container-image"]}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={URL_IMG + `${poster.file_path}`}
                  alt=""
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
