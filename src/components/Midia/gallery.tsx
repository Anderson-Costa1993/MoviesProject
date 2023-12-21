import style from "./gellery.module.css";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GalleryType } from "../../types";

export function Gallery() {
  const { filmId } = useParams();
  const [images, setImages] = useState<GalleryType>();

  useEffect(() => {
    apiMovieService
      .getImagesMovies(Number(filmId))
      .then((response) => setImages(response));
  }, [filmId]);

  const URL_IMG = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className={style['container-gallery']}>
      {images ? (
        <div className={style.gallery}>
          {images.posters.slice(0, 10).map((imagem) => (
            <div className={style.card} key={imagem.file_path}>
              <img src={URL_IMG + `${imagem.file_path}`} alt="" />
            </div>
          ))}
        </div>
      ) : null}
      <div>
        <a href={`/detailFilms/${(Number(filmId))}/galleryMovie`}>Ver mais</a>
      </div>
    </div>
  );
}
