
import { seriesBase } from "../../../types";

type Props = {
  movies: seriesBase[];
  topMovies: seriesBase[];
};

export function DetailSeriesPage({ movies }: Props) {
  console.log("netflix", movies);
  return (
    <div></div>
  );
}
