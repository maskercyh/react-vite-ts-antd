import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
<<<<<<< HEAD
import { logout } from "@/stores/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAliveController } from "react-activation";
import type { AppDispatch } from "~@/stores";
function App() {
  const { clear } = useAliveController();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [count, setCount] = useState(0);
  const handleLogout = async () => {
    await dispatch(logout());
    clear();
    navigate("/login");
  };
=======
import { logout } from "~@/stores/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/stores";
function App() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [count, setCount] = useState(0);
  async function handelLogout() {
    await dispatch(logout());
    navigate("login");
  }
>>>>>>> 1b537fcc2013b31ee2f1bd5be23e0638ef6b57ae

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
<<<<<<< HEAD
        <button onClick={handleLogout}>logout</button>
=======
        <button className="mt-25px margin-auto" onClick={handelLogout}>
          退出登录
        </button>
>>>>>>> 1b537fcc2013b31ee2f1bd5be23e0638ef6b57ae
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
