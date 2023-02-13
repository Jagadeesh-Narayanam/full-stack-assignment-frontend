import { Link, NavLink, Outlet } from "react-router-dom";
import { logoutAction } from "../../util/Logout";

function UserHome() {
  const username = localStorage.getItem("username");
  function logoutHandler() {
    if (window.confirm("Are you sure to logout?")===true) {
      logoutAction();
    }
  }
  return (
    <>
      <h1 className="heading">User HomePage</h1>
      <div className="navigation-bar">
        <div className="nav-links">
          <NavLink
            className={({ isActive }) => (isActive ? "active-nav" : undefined)}
            to="officeBearers"
          >
            Office Bearers
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-nav" : undefined)}
            to="products"
          >
            Products
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-nav" : undefined)}
            to={`${username}/profile`}
          >
            Profile
          </NavLink>
        </div>
        <div className="logout">
          <Link to="/">
            <button onClick={logoutHandler}>Logout</button>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default UserHome;
