import { Link } from "react-router-dom";
import "./Welcome.css"

function Welcome() {
  return (
    <>
      <h1 className="heading">Druggists and Chemists Association Application</h1>
      <div className="welcome-links">
      <Link to="/public/register">Register</Link>
      <br/>
      <Link to="/login">Login</Link>
      <br/>
      </div>
      
    </>
  );
}
export default Welcome;
