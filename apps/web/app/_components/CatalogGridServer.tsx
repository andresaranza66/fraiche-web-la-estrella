import { Suspense } from "react";
import { preloadQuery } from "convex/nextjs";
import type { FunctionArgs } from "convex/server";
import { api } from "../convex/api";
import CatalogoGrid from "./CatalogoGrid";
import PerfumeGridSkeleton from "./PerfumeGridSkeleton";

type Props = {
  gender: FunctionArgs<typeof api.perfumes.listByGender>["gender"];
  emptyLabel?: string;
};

async function LoadedCatalogoGrid({ gender, emptyLabel }: Props) {
  const preloadedPerfumes = await preloadQuery(
    api.perfumes.listByGender,
    { gender },
  );

  return (
    <CatalogoGrid
      preloadedPerfumes={preloadedPerfumes}
      emptyLabel={emptyLabel}
    />
  );
}

export default function CatalogoGridServer(props: Props) {
  return (
    <Suspense fallback={<PerfumeGridSkeleton />}>
      <LoadedCatalogoGrid {...props} />
    </Suspense>
  );
}