import { Form, Link, NavLink, Outlet } from "react-router-dom";
import { logoutAction } from "../../util/Logout";
import "./Admin CSS files/AdminHome.css";

function AdminHome() {
  function logoutHandler(){
    window.confirm("Are you sure to logout?");
    logoutAction();
  }
  return (
    <>
        <h2 className="heading">Admin Page</h2>
        <div className="navigation-bar">
      <div className="nav-links">
        <NavLink className={({isActive})=>isActive?"active-nav":undefined} to="users">All Users</NavLink>
        <NavLink className={({isActive})=>isActive?"active-nav":undefined} to="new_requests">New Registration Requests</NavLink>
        <NavLink className={({isActive})=>isActive?"active-nav":undefined} to="add_new_products">Add new products</NavLink>
        <NavLink className={({isActive})=>isActive?"active-nav":undefined} to="add_new_office_bearer">Add new office bearer</NavLink>
      </div>
      <div className="logout"><Link to="/">
          <button onClick={logoutHandler}>Logout</button>
        </Link></div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default AdminHome;
