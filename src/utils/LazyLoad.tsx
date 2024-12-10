import { Suspense, lazy } from "react";
const pages: Record<string, () => Promise<any>> = import.meta.glob(
  "../view/**/*.tsx"
);
function LazyLoad(url: string) {
  if (!url) {
    return <></>;
  }
  const loadElement = pages[`../view/${url}.tsx`];
  const ElementNode = lazy(() => loadElement());
  return (
    <Suspense>
      <ElementNode />
    </Suspense>
  );
}

export default LazyLoad;
