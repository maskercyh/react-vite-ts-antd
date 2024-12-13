import React, { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Tabs } from "antd";
import styles from "../index.module.less";
import { useDispatch, useSelector } from "react-redux";
import { useCommonStore } from "@/stores";
import type { TabsData } from "@/stores/tabs";
import {
  setActiveKey,
  addTabs,
  closeTabs,
  setNav,
  toggleLock,
  switchTabsLang,
} from "@/stores/tabs";
import type { AppDispatch, RootState } from "@/stores";
import Item from "antd/es/list/Item";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-node-key": string;
}

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props["data-node-key"],
    });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};
export default function TabsTop() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { tabs, permissions, isMaximize, menuList, routeList, activeKey } =
    useCommonStore();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const route = routeList.find((item) => item.path == pathname);
    dispatch(
      addTabs({ key: route.key, label: route.label, path: route?.path })
    );
  }, [pathname, addTabs]);

  const remove = (targetKey: string) => {
    dispatch(closeTabs(targetKey));
  };

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "remove") {
      remove(targetKey as string);
    }
  };
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
    }
  };
  const onChange = (key: string) => {
    const tab = tabs.find((tab) => tab.key == key) as TabsData;
    navigate(tab.path);
  };

  return (
    <div
      className={`
        ${styles["tab-top-container"]}
    `}
    >
      <Tabs
        hideAdd
        onEdit={onEdit}
        onChange={onChange}
        activeKey={activeKey}
        items={tabs}
        type="editable-card"
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext
            sensors={[sensor]}
            onDragEnd={onDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={tabs.map((i) => i.key)}
              strategy={horizontalListSortingStrategy}
            >
              <DefaultTabBar {...tabBarProps}>
                {(node) => (
                  <DraggableTabNode {...node.props} key={node.key}>
                    {node}
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
      />
    </div>
  );
}
