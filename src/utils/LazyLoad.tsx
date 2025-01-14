import React, { Suspense, lazy, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// 动态导入模块的映射
const pages: Record<
  string,
  () => Promise<{ default: React.ComponentType<any> }>
> = import.meta.glob("../view/**/*.tsx");

/**
 * 动态加载组件工具函数，封装错误检查
 * @param loader 动态加载函数
 * @returns React.lazy 包装的组件
 */
function loadComponent(
  loader: () => Promise<{ default: React.ComponentType<any> }>
) {
  return lazy(() =>
    loader().then((module) => {
      if (!module.default) {
        throw new Error("The module does not have a default export");
      }
      return { default: module.default };
    })
  );
}

/**
 * 动态加载组件并处理回退内容
 * @param element 组件名称（文件路径的一部分）
 * @returns JSX.Element
 */
function LazyLoad(element: string) {
  if (!element) {
    return <Outlet />;
  }

  const loadElement = pages[`../view/${element}.tsx`];
  if (!loadElement) {
    throw new Error(`Component "../view/${element}.tsx" not found`);
  }

  const ElementNode = loadComponent(loadElement);
  console.log(ElementNode);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ElementNode />
    </Suspense>
  );
}

export default LazyLoad;
