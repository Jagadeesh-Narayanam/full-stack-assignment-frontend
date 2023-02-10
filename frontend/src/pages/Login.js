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
// export async function loginAction({ request, params }) {
//   const formData = await request.formData();
//   const loginDetails = {
//     username: formData.get("username"),
//     password: formData.get("password"),
//   };
//   const response = await fetch("http://localhost:8080/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json"},
//     body: JSON.stringify(loginDetails),
//   });
//   if (!response.ok) {
//     console.login("Could not login");
//   } else {
//     const resData = await response.json();
//     console.log(resData);
//     // const headers = await response.headers;
//     for (var pair of response.headers.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }
//     // console.log(headers.get("Authorization"));
//     return redirect("/");
//   }
// }
