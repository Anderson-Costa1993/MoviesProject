import { useEffect, useState } from "react";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { ColletionType } from "../../types";
import stytle from "./collection.module.css"
import { useNavigate } from "react-router-dom";

type Props = {
  CollectionId: {
    id: number;
  };
};

export function Collection({ CollectionId }: Props) {
  const [colletion, setColletcion] = useState<ColletionType>();

  const navigate = useNavigate();

  useEffect(() => {
    apiMovieService.getColections(CollectionId.id).then((response) => {
      setColletcion(response);
    });
  }, [setColletcion]);

  const IMG = `https://image.tmdb.org/t/p/w500/`;

  return (
    <div className={stytle['container-collection']}>
      <h1>Collection</h1>
      {colletion ? (
        <section className={stytle['section-collection']}>
          {colletion.parts.map((item) => (
            <div className={stytle.card} onClick={()=> navigate(`/detailFilms/${item.id}`)} key={item.id}>
              <img src={IMG + `${item.poster_path}`} alt="" />
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
