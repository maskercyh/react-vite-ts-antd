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
import type { TabsProps } from "antd";
import { CSS } from "@dnd-kit/utilities";
import { Tabs } from "antd";
import styles from "../index.module.less";
import { useDispatch, useSelector } from "react-redux";
import { useCommonStore } from "@/stores";
import type { TabsData } from "@/stores/tabs";
import { ReloadOutlined } from "@ant-design/icons";
import {
  setActiveKey,
  addTabs,
  closeTabs,
  setNav,
  toggleLock,
  switchTabsLang,
} from "@/stores/tabs";
import { Dropdown } from "antd";
import type { AppDispatch, RootState } from "@/stores";
import { useAliveController } from "react-activation";

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
  const { refresh } = useAliveController();
  const { pathname, search } = useLocation();
  const {
    tabs,
    permissions,
    isMaximize,
    menuList,
    routeList,
    activeKey,
    isLock,
  } = useCommonStore();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<null | NodeJS.Timeout>(null);
  const [refreshTime, seRefreshTime] = useState<null | NodeJS.Timeout>(null);
  const url = pathname + search;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const route = routeList.find((item) => item.path == pathname);
    dispatch(addTabs({ key: route.path, label: route.label }));
    dispatch(setActiveKey(route.path));
  }, []);

  const remove = (targetKey: string) => {
    dispatch(closeTabs(targetKey));
  };
  console.log(tabs, activeKey);
  useEffect(() => {
    // 当选中贴标签不等于当前路由则跳转
    if (activeKey !== url) {
      const key = isLock ? activeKey : url;
      // handleAddTab(key);
      if (isLock) {
        navigate(key);
        dispatch(toggleLock(false));
      }
    }
  }, [activeKey, url]);
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
    dispatch(setActiveKey(tab.key));
    navigate(tab.key);
  };

  const onClickRefresh = () => {
    setLoading(true);
    if (!time) {
      dispatch(setRefresh(true));
      setTime(
        setTimeout(() => {
          setLoading(false);
          refresh(activeKey);
          // dispatch(setRefresh(false));
          setTime(null);
        }, 100)
      );
      seRefreshTime(
        setTimeout(() => {
          seRefreshTime(null);
        }, 1000)
      );
    }
  };

  // 下拉菜单内容
  const items = [
    {
      key: "index",
      label: <span>个人中心</span>,
    },
    {
      key: "dashboard",
      label: <span>退出登录</span>,
    },
  ];

  // const renderTabBar: TabsProps["renderTabBar"] = (
  //   tabBarProps,
  //   DefaultTabBar
  // ) => (
  //   <>
  //     <DndContext
  //       sensors={[sensor]}
  //       onDragEnd={onDragEnd}
  //       collisionDetection={closestCenter}
  //     >
  //       <SortableContext
  //         items={tabs.map((i) => i.key)}
  //         strategy={horizontalListSortingStrategy}
  //       >
  //         <DefaultTabBar {...tabBarProps}>
  //           {(node) => (
  //             <Dropdown
  //               key={node.key}
  //               menu={{
  //                 items,
  //                 onClick: (e) => {
  //                   console.log(e);
  //                 },
  //               }}
  //               trigger={["contextMenu"]}
  //             >
  //               <DraggableTabNode {...node.props} key={node.key}>
  //                 {React.cloneElement(node, {
  //                   children: (
  //                     <>
  //                       {node.props.children[0]}
  //                       <button
  //                         className="ant-tabs-tab-remove"
  //                         key="reload-button"
  //                       >
  //                         <ReloadOutlined spin={true} />
  //                       </button>
  //                       {node.props.children[1] && node.props.children[1]}
  //                     </>
  //                   ),
  //                 })}
  //               </DraggableTabNode>
  //             </Dropdown>
  //           )}
  //         </DefaultTabBar>
  //       </SortableContext>
  //     </DndContext>
  //   </>
  // );
  const renderTabBar: TabsProps["renderTabBar"] = (
    tabBarProps,
    DefaultTabBar
  ) => (
    <DefaultTabBar {...tabBarProps}>
      {(node) => (
        <Dropdown
          key={node.key}
          menu={{
            items,
            onClick: (e) => {
              refresh(e.key);
              console.log(e.key);
            },
          }}
          trigger={["contextMenu"]}
        >
          {React.cloneElement(node, {
            children: (
              <>
                {node.props.children[0]}
                {node.key === activeKey && (
                  <button
                    onClick={onClickRefresh}
                    className="ant-tabs-tab-remove"
                    key="reload-button"
                  >
                    <ReloadOutlined spin={loading} />
                  </button>
                )}
                {node.props.children[1] && node.props.children[1]}
              </>
            ),
          })}
        </Dropdown>
      )}
    </DefaultTabBar>
  );
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
        className={styles["tab-top-nav-list"]}
        tabBarGutter={5}
        renderTabBar={renderTabBar}
      />
    </div>
  );
}
