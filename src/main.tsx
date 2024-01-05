import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ContextProvider from "./Context/ContextPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailFilmesPage } from "./routes/DetailFilmes/index.tsx";
import { HomePage } from "./routes/Home/index.tsx";
import { FilmesPage } from "./routes/Filmes/index.tsx";
import { SeriesPage } from "./routes/Series/index.tsx";
import { DetailSeriesPage } from "./routes/DetailSeries/index.tsx";
import { GalleryMovie } from "./routes/GalleryMovie/GalleryMovie.tsx";
import { PostestesPage } from "./routes/PosteresFilmes/PostestesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/filmes",
        element: <FilmesPage />,
      },
      {
        path: "/filmes/:id",
        element: <DetailFilmesPage />,
      },
      {
        path: "/filmes/:id/gallery",
        element: <GalleryMovie />,
      },
      {
        path: "/filmes/:id/posteres",
        element: <PostestesPage />,
      },
      {
        path: "/series",
        element: <SeriesPage />,
      },
      {
        path: "/series/:id",
        element: <DetailSeriesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
