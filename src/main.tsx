import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ContextProvider from "./Context/ContextPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailFilmsPage } from "./routes/DetailsFilms/index.tsx";
import { HomePage } from "./routes/Home/index.tsx";
import { FilmPage } from "./routes/Films/index.tsx";
import { SeriesPage } from "./routes/Series/index.tsx";
import { DetailSeriesPage } from "./routes/DetailSeries/index.tsx";
import { GalleryMovie } from "./routes/GalleryMovie/GalleryMovie.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/detailFilms/:filmId",
        element: <DetailFilmsPage />,
      },
      {
        path: "/films/:page/:genres?",

        element: <FilmPage />,
      },
      {
        path: "/series/:page/:sort_by",
        element: <SeriesPage />,
      },
      {
        path: "/detailSeries/:serieId",
        element: <DetailSeriesPage />,
      },
      {
        path: "/detailFilms/:filmId/galleryMovie",
        element: <GalleryMovie />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
