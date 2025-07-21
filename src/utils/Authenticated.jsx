import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {AuthContextInternal} from "../utils/AuthContext"
export default function Authenticated() {

  const location = useLocation();
   const {user,loading} = useContext(AuthContextInternal)
  if (loading) {
    return <h3>Loading...</h3>; 
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ path: location.pathname,text: "You must login first!" }} replace />
  );
}
