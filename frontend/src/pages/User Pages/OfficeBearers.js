import { useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/Token";
import "./User CSS Files/OfficeBearers.css";

function OfficeBearers() {
  const data = useLoaderData();

  return (
    <>
      <h1 className="heading">Office Bearers</h1>
      <div className="office-bearers">
        {data.map((officeBearer) => (
          <table key={officeBearer.id} className="office-bearer">
            <tbody>
              <tr>
                <td>Position</td>
                <td>:</td>
                <td>{officeBearer.position}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{officeBearer.name}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>:</td>
                <td>{officeBearer.phoneNumber}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{officeBearer.email}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </>
  );
}
export default OfficeBearers;

export async function officeBearersLoader() {
  const response = await fetch("http://localhost:8080/user/officeBearers", {
    headers: {
      authorization: getAuthToken(),
    },
  });
  if (!response.ok) {
    console.log("Could not fetch Office Bearers");
  } else {
    // console.log("Office Bearers loaded suucessfully");
    const resData = await response.json();
    return resData;
  }
  return null;
}
