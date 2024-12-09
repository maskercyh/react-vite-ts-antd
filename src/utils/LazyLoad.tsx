import { Suspense, lazy } from "react";
import loadable from "@loadable/component";
const loadables: any = loadable;
const pages: Record<string, () => Promise<any>> = import.meta.glob(
  "../view/**/*.tsx"
);
function LazyLoad(url: string) {
  const loadComponent = pages[`../view/${url}.tsx`];
  const ComponentNode = lazy(() => loadComponent());
  // const ComponentNode = loadables(async () => {
  //   return pages[`../view/${url}.tsx`]();
  // });
  return (
    <Suspense>
      <ComponentNode />
    </Suspense>
  );
}

export default LazyLoad;
