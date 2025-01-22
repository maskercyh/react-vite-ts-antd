import { Suspense } from "react";
import loadable from "@loadable/component";
const modules = import.meta.glob("@/view/*/**/*.tsx");
const loadables: any = loadable;

function LazyLoad(url: string) {
  const ComponentNode = loadables(async () => {
    return modules[`/src/view/${url}.tsx`]();
  });

  return (
    <Suspense>
      <ComponentNode />
    </Suspense>
  );
}

export default LazyLoad;
