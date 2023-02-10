import { redirect } from "react-router-dom";

export function getAuthToken(){
    return localStorage.getItem("token");
}
export function deleteToken(){
    localStorage.removeItem("item");
}
export function checkAuthLoader(){
    const token = getAuthToken();
    if(token===null){
        return redirect("/login");
    }
    return token;
}