import { Form, redirect } from "react-router-dom";
import { getAuthToken } from "../../util/Token";
import "./Admin CSS files/AddNewOfficeBearer.css";

function AddNewOfficeBearer() {
  return (
    <>
      <div>
        <h1 className="heading">Add New Office Bearer</h1>

        <Form method="post" className="office-bearer-form">
            <label htmlFor="position"><h5>Position</h5></label>
            <input type="text" name="position" />
            <label htmlFor="name"><h5>Name</h5></label>
            <input type="text" name="name" />
            <label htmlFor="phoneNumber"><h5>Phone Number</h5></label>
            <input type="text" name="phoneNumber" />
            <label htmlFor="email"><h5>Email</h5></label>
            <input type="email" name="email" />
            <button type="submit">Submit</button>
        </Form>
      </div>
    </>
  );
}
export default AddNewOfficeBearer;

export async function addOfficeBearerAction({ request, params }) {
  const formData = await request.formData();
  const data = {
    position: formData.get("position"),
    name: formData.get("name"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
  };
  const response = await fetch(
    "http://localhost:8080/admin/add_new_office_bearer",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getAuthToken(),
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    console.log("Could not add new office bearer");
  } else {
    console.log("Office Bearer added successfully");
  }
  return redirect("/user/officeBearers");
}
