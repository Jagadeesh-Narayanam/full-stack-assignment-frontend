import { getAuthToken } from "../../util/Token";
import { Link } from "react-router-dom";

function RequestApproved() {
  return (
    <>
      <h4 className="heading">New User added</h4>
      <Link to="/admin/new_requests"><h5 className="heading">Back</h5></Link>
    </>
  );
}
export default RequestApproved;

export async function requestApprovedLoader({ request, params }) {
  // const url= new URL(request.url).href;
  const requestId = params.requestId;
  // console.log(params);

  // const response = await fetch(url);
  const response = await fetch(
    "http://localhost:8080/admin/new_requests/" + requestId + "/accept",
    {
      headers: {
        authorization: getAuthToken(),
      },
    }
  );
  // console.log(url);
  if (!response.ok) {
    console.log("Could not Approve");
  } else {
    console.log("Request Approved !! ");
  }
  return null;
}
