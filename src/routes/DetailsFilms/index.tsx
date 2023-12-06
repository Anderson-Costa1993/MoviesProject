import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { DetailsMovie } from "../../types";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";
import { DetailFilmsPage } from "./DetailsFilmsPage";
import { DetailMovieVideosType } from "../../types";

type DetailMoviesDataLoader = {
  filmDetails: Promise<DetailsMovie>;
  filmDetailVideos: Promise<DetailMovieVideosType[]>
};


export function DetailFilms () {
  const { filmDetails, filmDetailVideos } = useLoaderData() as DetailMoviesDataLoader;
  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
      <Await resolve={Promise.all([filmDetails, filmDetailVideos])}>
          {(resolveDetails: [DetailsMovie, DetailMovieVideosType[]]) => {
            const [resolvefilmDetails, resolvefilmDetailVideos] = resolveDetails;
          return  <DetailFilmsPage filmDetails={resolvefilmDetails} filmDetailVideos={resolvefilmDetailVideos} />
          }}
        </Await>
      </Suspense>
    </div>
  )
}