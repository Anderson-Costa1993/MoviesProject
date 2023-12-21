import { GalleryEl } from "../../components/Gallery/Gallery"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { apiMovieService } from "../../services/ServiceApiMovie";
import { GalleryType } from "../../types";

export function GalleryMovie() {

  const { filmId  } = useParams()
  const [images, setImages] = useState<GalleryType>();

  useEffect(() => {
    apiMovieService
      .getImagesMovies(Number(filmId))
      .then((response) => setImages(response));
  }, [filmId]);

  return(
    <div>
      <GalleryEl images={images} />
    </div>
  )

}