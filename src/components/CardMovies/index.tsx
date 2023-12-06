import style from "./cardMovies.module.css"
import { useNavigate} from "react-router-dom"
import { moviesType } from "../../types";

type Props = {
  movies :moviesType[]
};

export function CardMovies ({movies} : Props) {
  console.log("card",  movies)
  const navigate = useNavigate()
  const URL = "https://image.tmdb.org/t/p/w500/";
  return (
    <div>
      <div className={style["container-home"]}>
        {movies.map((moviesItem: moviesType) => (
          <div
            onClick={() => navigate(`/detailFilms/${moviesItem.id}`)}
            className={style.card}
            key={moviesItem.id}
            onMouseEnter={() => {
            }}
          >
            <img className="" src={`${URL + moviesItem.poster_path}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}