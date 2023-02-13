import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddNewOfficeBearer, { addOfficeBearerAction } from "./pages/Admin Pages/AddNewOfficeBearer";
import AddNewProducts, { addNewProductsAction } from "./pages/Admin Pages/AddNewProducts";
import AdminHome from "./pages/Admin Pages/AdminHome";
import AdminLogin from "./pages/Admin Pages/AdminLogin";
import AllUsers, { usersLoader } from "./pages/Admin Pages/AllUsers";
import NewRequests, { requestsLoader } from "./pages/Admin Pages/NewRequests";
import RequestApproved, { requestApprovedLoader } from "./pages/Admin Pages/RequestApproved";
import RequestDeclined, { requestDeclinedLoader } from "./pages/Admin Pages/RequestDeclined";
import Login from "./pages/Login";
import RegistrationPage, {
  action as registrationAction,
} from "./pages/RegistrationPage";
import Success from "./pages/Success";
import EditProfile, { editProfileAction } from "./pages/User Pages/EditProfile";
import OfficeBearers, { officeBearersLoader } from "./pages/User Pages/OfficeBearers";
import Products, { productsLoader } from "./pages/User Pages/Products";
import Profile, { profileLoader } from "./pages/User Pages/Profile";
import UserHome from "./pages/User Pages/UserHome";
import UserLogin from "./pages/User Pages/UserLogin";
import Welcome from "./pages/Welcome";
import { loginAction } from "./util/LoginForm";
import { logoutAction } from "./util/Logout";
import { checkAuthLoader } from "./util/Token";

const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  {
    path: "/public/register",
    element: <RegistrationPage />,
    action: registrationAction,
  },
  { path: "/registration_success", element: <Success /> },
  {path:"/login",element:<Login/>},
  {path:"/admin/login",element:<AdminLogin/>,action:loginAction},
  {path:"/user/login",element:<UserLogin/>,action:loginAction},
  {
    path: "/admin",
    element: <AdminHome />,
    loader:checkAuthLoader,
    children: [
      { path: "users",element:<AllUsers/>,loader: usersLoader},
      {path:"users/:userId/changeStatus",element:<AllUsers/>,loader:usersLoader},
      { path: "new_requests",element:<NewRequests/>,loader:requestsLoader},
      {path:"new_requests/:requestId/accept",element:<RequestApproved/>,loader:requestApprovedLoader},
      {path:"new_requests/:requestId/decline",element:<RequestDeclined/>,loader:requestDeclinedLoader},
      { path: "add_new_products",element:<AddNewProducts/>,action:addNewProductsAction},
      { path: "add_new_office_bearer",element:<AddNewOfficeBearer/>,action:addOfficeBearerAction },
    ],
  },
  {path:"/user",element:<UserHome/>,loader:checkAuthLoader,children:[
    {path:"officeBearers",element:<OfficeBearers/>,loader:officeBearersLoader},
    {path:"products",element:<Products/>,loader:productsLoader},
    {path:":username/profile",loader:profileLoader,id:"profile",children:[
      {index:true,element:<Profile/>},
      {path:"edit",element:<EditProfile/>,action:editProfileAction}
    ]}
  ]},
  {path:"/logout",action:logoutAction}
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
