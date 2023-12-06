
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";
import { DetailSeriesPage } from "./DetailseriesPage";
import { seriesBase } from "../../types";

type ProductDataLoader = {
  movies: Promise<seriesBase[]>;
  topMovies: Promise<seriesBase[]>;
};

export function DetailSeries () {

  const { movies, topMovies } = useLoaderData() as ProductDataLoader;

  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <Await resolve={Promise.all([movies, topMovies])}>
          {(resolvedProducts: [seriesBase[], seriesBase[]]) => {
            const [resolvedMovies, resolvedTopMovies] = resolvedProducts;
            return <DetailSeriesPage movies={resolvedMovies} topMovies={resolvedTopMovies} />;
          }}
        </Await>
      </Suspense>
    </div>
  )

}