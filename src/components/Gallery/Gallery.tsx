
import style from "./gallery.module.css";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../LoadingEl/LoadingPage";
import { useRequest } from "ahooks";
import { apiMovieService } from "../../services/ServiceApiMovie";

export function GalleryEl() {

  const URL_IMG = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";

  const { id } = useParams();

  const {
    data: images,
    loading,
    error,
  } = useRequest(() => apiMovieService.getImagesMovies(Number(id)), {
    refreshDeps: [id],
    cacheTime: -1,
  });

  if (loading) return <LoadingPage />;
  if (error) return <h1>Error</h1>;

  return (
    <div className={style["container-gallery"]}>
      <h1>Planos de Fundo</h1>
      <div className={style["container-gallery"]}>
        {images
          ? images.backdrops.map((poster) => (
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
