import ReactDOM from "react-dom/client";
import { apiMovieService } from "./services/ServiceApiMovie.ts";
import App from "./App.tsx";
import "./index.css";
import { Home } from "./routes/Home/index.tsx";
import ContextProvider from "./Context/ContextPage.tsx";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import { DetailFilms } from "./routes/DetailsFilms/index.tsx";
import { Films } from "./routes/Films/index.tsx";
import { SeriesRecents } from "./routes/Series/index.tsx";
import { DetailSeries } from "./routes/DetailSeries/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        loader: () => {
          const movies = apiMovieService.getMovies();
          const topMovies = apiMovieService.getTopFilms();
          const soonRelease = apiMovieService.getSoonRelease();
          return defer({
            movies,
            topMovies,
            soonRelease
          });
        },
        element: <Home />,
      },
      {
        path: "/detailFilms/:filmId",
        loader: (options) => {
          const params = options.params as any;
          const filmDetails = apiMovieService.getDetailsFilmes(params.filmId);
          const filmDetailVideos = apiMovieService.getVideoFilms(params.filmId);
          return defer({
            filmDetails,
            filmDetailVideos
          });
        },
        element: <DetailFilms />,
      },
      {
        path: "/films/:page/:genres?",
        loader: (options) => {
          const params = options.params as any;
          const movies = apiMovieService.getAllFilms(
            params.page,
            params.genres || undefined
          );
          return defer({
            movies,
          });
        },
        element: <Films />,
      },
      {
        path: "/series/:page/:sort_by",
        loader: (options) => {
          const params = options.params as any;
          const series = apiMovieService.getSeriesRecents(params.page, params.sort_by);
          return defer({
            series,
          });
        },
        element: <SeriesRecents />,
      },
      {
        path: "/tv",
        loader: () => {
          const movies = apiMovieService.getOriginaisNetflix();
          const topMovies = apiMovieService.getTopFilms();
          return defer({
            movies,
            topMovies
          });
        },
        element: <DetailSeries />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
