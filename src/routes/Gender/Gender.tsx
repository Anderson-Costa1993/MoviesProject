import style from "./gender.module.css";
import { useEffect, useState } from "react";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { GenreType } from "../../types";

interface GenereProps {
  onGenreClick: (genereItem: GenreType) => void;
}

export function Genere({ onGenreClick }: GenereProps) {
  const [genere, setGenere] = useState<GenreType[] | undefined>();

  useEffect(() => {
    apiMovieService.getGenere().then((response) => {
      setGenere(response.genres);
    });
  }, [setGenere]);

  const handleGenreClick = (genereItem: GenreType) => {
    if (onGenreClick) {
      onGenreClick(genereItem);
    }
  };

  if (genere)
    return (
      <div className={style["container-gender"]}>
        <ul>
          {genere?.map((genereItem) => (
            <li key={genereItem.id} onClick={() => handleGenreClick(genereItem)}>
              <a href="">{genereItem.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
}
