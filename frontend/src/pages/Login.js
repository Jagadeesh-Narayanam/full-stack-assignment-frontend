import { Form, Link, redirect } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <>
      <div className="login-links">
        <Link to="/admin/login">Admin Login</Link>
        <Link to="/user/login">User Login</Link>
      </div>
      <h4 className="heading">
        Not a registered user ? <Link to="/public/register">Register here</Link>
      </h4>
    </>
  );
}
export default Login;
