import { useCallback, useEffect, useState } from "react";
import { searchList } from "./model";
import { useUnactivate } from "react-activation";
import { useTranslation } from "react-i18next";
import Bar from "./components/Bar";
import Line from "./components/Line";
import Block from "./components/Block";

function Dashboard() {
  const { pathname } = useLocation();
  return (
    <div>
      <h1>Current Path: {pathname}</h1>
      dashboard
    </div>
  );
}

export default Dashboard;
