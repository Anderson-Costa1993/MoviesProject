import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { LoadingPage } from "../../components/LoadingEl/LoadingPage";
import { SeriesPage } from "./SeriesPage";
import { SeriesType } from "../../types";

type SeriesDataLoader = {
  series: Promise<SeriesType[]>;
};

export function SeriesRecents() {
  const { series } = useLoaderData() as SeriesDataLoader;

  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <Await resolve={series}>
          {(resolveSeries: SeriesType[]) => (
            <SeriesPage series={resolveSeries} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
