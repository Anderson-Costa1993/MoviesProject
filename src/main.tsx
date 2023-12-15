import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ContextProvider from "./Context/ContextPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailFilmsPage } from "./routes/DetailsFilms/index.tsx";
import { TestePage } from "./routes/testes/Teste.tsx";
import { HomePage } from "./routes/Home/index.tsx";
import { FilmPage } from "./routes/Films/index.tsx";
import { SeriesPage } from "./routes/Series/index.tsx";

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
        path: "/teste/:filmId",
        element: <TestePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
