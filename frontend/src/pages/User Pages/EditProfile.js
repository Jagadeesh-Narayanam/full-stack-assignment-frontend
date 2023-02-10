import { Form, useRouteLoaderData,redirect } from "react-router-dom";
import { getAuthToken } from "../../util/Token";
import "./User CSS Files/EditProfile.css";

function EditProfile() {
  const data = useRouteLoaderData("profile");
  return (
    <>
      <h1 className="heading">Edit Profile</h1>
      <Form method="POST" className="edit-profile-form">
        <label htmlFor="businessName">Business Name</label>
        <input
          type="text"
          name="businessName"
          defaultValue={data.businessName}
        />
        <br />
        <label htmlFor="contactPerson">Contact Person</label>
        <input
          type="text"
          name="contactPerson"
          defaultValue={data.contactPerson}
        />
        <br />
        <label htmlFor="drugLicense">Drug License</label>
        <input type="text" name="drugLicense" defaultValue={data.drugLicense} />
        <br />
        <label htmlFor="gst">GST</label>
        <input type="text" name="gst" defaultValue={data.gst} />
        <br />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" name="phoneNumber" defaultValue={data.phoneNumber} />
        <br />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}
export default EditProfile;

export async function editProfileAction({ request, params }) {
  const username = localStorage.getItem("username");
  const formData = await request.formData();
  console.log(formData);

  const data = {
    businessName: formData.get("businessName"),
    contactPerson: formData.get("contactPerson"),
    drugLicense: formData.get("drugLicense"),
    gst: formData.get("gst"),
    phoneNumber:formData.get("phoneNumber")
  };
  const response = await fetch(
    "http://localhost:8080/user/" + username + "/profile/edit",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: getAuthToken(),
      },
      body: JSON.stringify(data),
    }
  );
  if(!response.ok){
    console.log("Could not edit user profile");
    return response;
  }
  else{
    return redirect("../");
  }
}
