import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";
import { HomePage } from "./HomePage";
import { moviesType } from "../../types";

type ProductDataLoader = {
  movies: Promise<moviesType[]>;
  topMovies: Promise<moviesType[]>;
  soonRelease: Promise<moviesType[]>
};

export function Home() {
  const { movies, topMovies, soonRelease } = useLoaderData() as ProductDataLoader;


  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <Await resolve={Promise.all([movies, topMovies, soonRelease])}>
          {(resolvedProducts: [moviesType[], moviesType[], moviesType[]]) => {
            const [resolvedMovies, resolvedTopMovies, resolvedSoonRelease ] = resolvedProducts;
            return <HomePage movies={resolvedMovies} topMovies={resolvedTopMovies} soonRelease={resolvedSoonRelease} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
