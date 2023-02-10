import { Form, json, redirect, useActionData } from "react-router-dom";
import "../pages/Login.css";

function LoginForm(props) {
  const data = useActionData();
  return (
    <>
      <Form method="post" className="login">
        <h2 className="heading">{props.heading}</h2>
        {data === "User blocked" && (
          <p style={{ color: "red" }}>User blocked</p>
        )}
        <label htmlFor="username">UserName</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </Form>
    </>
  );
}
export default LoginForm;

export async function loginAction({ request, params }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const loginDetails = {
    username: username,
    password: password,
  };
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  });
  //   if (!response.ok) {
  //     console.log("Could not login");
  //   } else if (response.status === 401) {
  //     console.log("Unauthorized");
  //   } else if (response.status === 403) {
  //     console.log("Forbidden");
  //   }
  if (response.ok) {
    // response.addHeader("Authorization","Basic "+window.btoa(username+":"+password));
    const resData = await response.json();
    if (resData.enabled === true) {
      localStorage.setItem(
        "token",
        "Basic " + window.btoa(username + ":" + password)
      );
      localStorage.setItem("username", username);
      //   console.log(localStorage.getItem("token"));

      //   console.log(resData);
      if (resData.role === "ADMIN") {
        return redirect("/admin");
      } else if (
        resData.role === "RETAILER" ||
        resData.role === "DISTRIBUTOR"
      ) {
        return redirect("/user");
      } else {
        return response.error;
      }
    } else {
      // console.log(resData);
      return "User blocked";
    }
  } else {
    return response.error;
  }
}
