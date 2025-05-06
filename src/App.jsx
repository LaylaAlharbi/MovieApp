import Router from "./router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <div className="dark:bg-gray-dark-main">
      <Router />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;