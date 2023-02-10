import { redirect, useRouteLoaderData,Link } from "react-router-dom";
import { getAuthToken } from "../../util/Token";
import "./User CSS Files/Profile.css";

function Profile() {
  const data = useRouteLoaderData("profile");
  return (
    <>
      <h1 className="heading">Profile</h1>
      <table className="profile">
        <tbody>
        <tr>
          <td><label htmlFor="businessName"><h4>Business Name</h4></label></td>
          <td><h4>:</h4></td>
          <td><h4 name="businessName">{data.businessName}</h4></td>
        </tr>
        <tr>
          <td><label htmlFor="contactPerson"><h4>Contact Person</h4></label></td>
          <td><h4>:</h4></td>
          <td><h4 name="contactPerson">{data.contactPerson}</h4></td>
        </tr>
        <tr>
          <td><label htmlFor="drugLicense"><h4>Drug License</h4></label></td>
          <td><h4>:</h4></td>
          <td><h4 name="drugLicense">{data.drugLicense}</h4></td>
        </tr>
        <tr>
          <td><label htmlFor="gst"><h4>GST</h4></label></td>
          <td><h4>:</h4></td>
          <td><h4 name="gst">{data.gst}</h4></td>
        </tr>
        <tr>
          <td><label htmlFor="phoneNumber"><h4>Phone No</h4></label></td>
          <td><h4>:</h4></td>
          <td><h4 name="phoneNumber">{data.phoneNumber}</h4></td>
        </tr>
        <tr>
          <td><label htmlFor="role"><h4>Role</h4></label></td>
          <td><h4>:</h4></td>
          <td><h4 name="role">{data.role}</h4></td>
        </tr>

        </tbody>
        </table>
        <Link to="edit"><h4 className="heading">Edit your profile</h4></Link>
    </>
  );
}
export default Profile;

export async function profileLoader({ request, params }) {
  const username = localStorage.getItem("username");
  const response = await fetch(
    "http://localhost:8080/user/" + username + "/profile",
    {
      headers: {
        authorization: getAuthToken(),
      },
    }
  );
  if (!response.ok) {
    console.log("Could not load User Profile");
  } else {
    console.log("User Profile loaded successfully");
    const resData = await response.json();
    // console.log(resData);
    return resData;
  }
  return response;
}
