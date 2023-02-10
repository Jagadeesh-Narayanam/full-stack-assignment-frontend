import { Form, redirect, useActionData } from "react-router-dom";
import "./Registration.css";
function RegistrationPage() {
  const data = useActionData();
  return (
    <>
      <h1 className="heading">Register here</h1>
      
      <Form method="post" className="registration-form">
        <label htmlFor="businessName">Business Name</label>
        <input type="text" name="businessName" minLength="5" maxLength="50" required/>
        <label htmlFor="contactPerson">Contact Person</label>
        <input type="text" name="contactPerson" maxLength="50" required/>

        <label htmlFor="drugLicense">Drug License</label>
        <input type="text" name="drugLicense" maxLength="20" required/>

        <label htmlFor="gst">GST ID</label>
        <input type="text" name="gst" maxLength="15" required/>

        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" name="phoneNumber" pattern="[789][0-9]{9}" size="10" required/>

        {data && data.status==400 &&<p className="error">Username already taken</p>}
        <label htmlFor="username">UserName</label>
        <input type="text" name="username" required/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" required/>

        <label htmlFor="role">Role</label>
        <select name="role" required>
          <option disabled selected>None</option>
          <option value="RETAILER">Retailer</option>
          <option value="DISTRIBUTOR">Distributor</option>
        </select>
        <br/>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}
export default RegistrationPage;
export async function action({ request, params }) {
  const formData = await request.formData();
  //   console.log(formData);
  const data = {
    businessName: formData.get("businessName"),
    contactPerson: formData.get("contactPerson"),
    drugLicense: formData.get("drugLicense"),
    gst: formData.get("gst"),
    phoneNumber: formData.get("phoneNumber"),
    username: formData.get("username"),
    password: formData.get("password"),
    role:formData.get("role")
  };
  const response = await fetch("http://localhost:8080/public/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "cors",
  });
  if (!response.ok) {
    console.log("error while registering");
    // console.log(response);
    return response;

  } else if (response.status == 400) {
    return response.error;
  } else {
    const resData = await response.json();
    console.log("success");
    console.log(resData);
    return redirect("/registration_success");
  }
}
