import React from "react";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ACCESSTOKEN, settings } from "../util/config";

export const PrivateRouter = () => {
  // const { userReducer } = useSelector(
  //   (state) => state.persistedReducer.userMovie
  // );
  return settings.getCookie(ACCESSTOKEN) ? <Outlet /> : <Navigate to="/login" />;
};