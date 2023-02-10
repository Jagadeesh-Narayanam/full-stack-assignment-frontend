import { useLoaderData, useNavigate } from "react-router-dom";
import { getAuthToken } from "../../util/Token";
import "./Admin CSS files/AllUsers.css";
function AllUsers() {
  const data = useLoaderData();
  const navigate = useNavigate();
  // console.log(data);
  async function statusHandler(userId) {
    const response = await fetch(
      "http://localhost:8080/admin/users/" + userId + "/changeStatus",
      {
        headers: {
          authorization: "Basic " + window.btoa("msdhoni" + ":" + "msdhoni"),
        },
      }
    );
    if (!response.ok) {
      console.log("Could not change status of user");
    } else {
      return navigate("/admin/users");
    }
  }

  return (
    <>
      <h1 className="heading">List of Users</h1>
      <table className="table table-light">
        <tbody>
          <tr>
            <th>Business Name</th>
            <th>Contact Person</th>
            <th>Drug License</th>
            <th>GST</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
          {console.log(data)}
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.businessName}</td>
              <td>{user.contactPerson}</td>
              <td>{user.drugLicense}</td>
              <td>{user.gst}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              {/* {user.enabled ? <td className="active">Active</td> : <td className="blocked">Blocked</td>}
              <td>
                <button onClick={() => statusHandler(user.id)}>Toggle</button>
              </td> */}
              <td><button onClick={()=>statusHandler(user.id)} disabled= {user.role==="ADMIN"} className={user.enabled?"active":"blocked"}>{user.enabled?<td>Active</td>:<td>Blocked</td>}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default AllUsers;
export async function usersLoader() {
  const response = await fetch("http://localhost:8080/admin/users", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization":getAuthToken() ,
    },
  });
  console.log(response);
  if (!response.ok) {
    console.log("Could not fetch users");
    console.log(response.json());
    return null;
    // return redirect("/admin");
  } else {
    const resData = await response.json();
    // console.log(JSON.stringify(resData));
    return resData;
  }
}

// export async function userStatusAction({request,params}){
//   const userId = params.get("userId");
//   const response = await fetch("http://localhost:8080/admin/users/"+userId+"/changeStatus");
//   if(!response.ok){
//     console.log("Could not change the status of user :"+userId);
//   }
//   else{
//     redirect(userId+"/changeStatus");
//   }
// }
