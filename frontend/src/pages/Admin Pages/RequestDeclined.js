import { getAuthToken } from "../../util/Token";
import { Link } from "react-router-dom";

function RequestDeclined() {
  return (
    <>
      <h4 className="heading">Registration Request Declined</h4>
      <Link to="/admin/new_requests"><h5 className="heading">Back</h5></Link>
    </>
  );
}
export default RequestDeclined;
export async function requestDeclinedLoader({request,params}){
    // const url = new URL(request.url).href;
    const requestId = params.requestId;
    
    const response = await fetch("http://localhost:8080/admin/new_requests/"+requestId+"/decline",{
      headers: {
        authorization: getAuthToken(),
      },
    });
    if(!response.ok){
        console.log("Decline failed");
    }
    else{
        console.log("Registration Declined");
    }
    return null;
}
