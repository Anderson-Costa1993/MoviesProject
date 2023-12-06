import { moviesType } from "../../types";
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";
import { FilmPage } from "./FilmsPage";

type ProductDataLoader = {
  movies: Promise<moviesType[]>;
};

export function Films() {
  const { movies } = useLoaderData() as ProductDataLoader;

  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <Await resolve={movies}>
          {(resolveMovie: moviesType[]) => <FilmPage movies={resolveMovie} />}
        </Await>
      </Suspense>
    </div>
  );
}
