import style from "./gellery.module.css";
import { apiMovieService } from "../../../services/ServiceApiMovie";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../../LoadingEl/LoadingPage";
import { useRequest } from "ahooks";

export function Gallery() {
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

  const URL_IMG = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className={style["container-gallery"]}>
      {images ? (
        <div className={style.gallery}>
          {images.backdrops.slice(0, 10).map((imagem) => (
            <div className={style.card} key={imagem.file_path}>
              <img src={URL_IMG + `${imagem.file_path}`} alt="" />
            </div>
          ))}
        </div>
      ) : null}
      <div>
        <a href={`/filmes/${Number(id)}/gallery`}>Ver mais</a>
      </div>
    </div>
  );
}
