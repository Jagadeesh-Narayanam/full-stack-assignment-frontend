import { Link, redirect, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/Token";
import "./Admin CSS files/NewRequests.css";

function NewRequests() {
  const data = useLoaderData();
  return (
    <>
      <h1 className="heading">New Registration Requests</h1>
      <table className="table table-light">
        <tbody>
          <tr>
            <th>Business Name</th>
            <th>Contact Person</th>
            <th>Drug License</th>
            <th>GST</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Approve/Decline</th>
          </tr>
          
          {data.length!=0 && data.map((request) => (
            <tr key={request.id}>
              <td>{request.businessName}</td>
              <td>{request.contactPerson}</td>
              <td>{request.drugLicense}</td>
              <td>{request.gst}</td>
              <td>{request.phoneNumber}</td>
              <td>{request.role}</td>
              <td className="status">
                <Link to={`${request.id}/accept`}><button className="approve">✔</button></Link>
                <Link to={`${request.id}/decline`}><button className="decline">✖</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length===0 && <h3 className="heading">No new registration requests</h3>}
    </>
  );
}
export default NewRequests;

export async function requestsLoader() {
  const response = await fetch("http://localhost:8080/admin/new_requests", {
    headers: {
      authorization: getAuthToken(),
    },
  });
  if (!response.ok) {
    console.log("Could not fetch New Registration Requests");
    return redirect("/admin");
  } else {
    const resData = await response.json();
    return resData;
  }
}

