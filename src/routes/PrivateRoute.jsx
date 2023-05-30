import React from "react";
import { Route, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import userStore from "../stores/userStore";

function isAuthenticated() { return userStore.isLoggedIn }

function PrivateRoute({ path, ...props }) {
    if (isAuthenticated()) {
        return <Outlet />
    } else {
        alert('You are not authorized to view this page');
        return (<Navigate to="/login" replace />)
    }
}

export default PrivateRoute;