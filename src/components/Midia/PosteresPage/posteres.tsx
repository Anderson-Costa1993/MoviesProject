import { apiMovieService } from "../../../services/ServiceApiMovie";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../../LoadingEl/LoadingPage";
import { useRequest } from "ahooks";
import style from "./posteres.module.css";

export function Posteres() {
  const { id } = useParams();
  const URL_IMG = "https://image.tmdb.org/t/p/w500/";

  const {
    data: posteres,
    loading,
    error,
  } = useRequest(() => apiMovieService.getImagesMovies(Number(id)), {
    refreshDeps: [id],
    cacheTime: -1,
  });

  if (loading) return <LoadingPage />;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      <div className={style["container-gallery"]}>
        {posteres ? (
          <div className={style.gallery}>
            {posteres.posters.slice(0, 10).map((imagem) => (
              <div className={style.card} key={imagem.file_path}>
                <img src={URL_IMG + `${imagem.file_path}`} alt="" />
              </div>
            ))}
          </div>
        ) : null}
        <div>
          <a href={`/filmes/${Number(id)}/posteres`}>Ver mais</a>
        </div>
      </div>
    </div>
  );
}
