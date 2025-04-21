import { useEffect } from "react";
import { selectLoggedInUser, userSignOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function Logout(){
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    useEffect(()=>{
        dispatch(userSignOutAsync());
    })
    return(
        <>
            {!user && <Navigate to={'/login'} replace={true}></Navigate>}
        </>
    )
}