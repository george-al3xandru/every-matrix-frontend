import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="container">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
