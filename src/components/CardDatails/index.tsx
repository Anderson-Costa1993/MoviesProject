import style from "./cardDetails.module.css";


type Props = {
  movies?: string;
  series?: string;
};

export function CardMoviesDetails({ movies, series }: Props) {
  console.log("card", movies);

  const URL_Image = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  return (
    <div>
      {movies ? (
        <div>
          <div className={style["container-home"]}>
            <img src={URL_Image + `${movies}`} alt="" />
          </div>
        </div>
      ) : null}

      {series ? (
        <div>
          <div className={style["container-home"]}>
            <img src={URL_Image + `${series}`} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
