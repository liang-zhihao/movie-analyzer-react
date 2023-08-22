import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

// import pages
import LandingPage from "../pages/Landing";
import MoviesPage from "../pages/Movies";
import MovieDetailsPage from "../pages/MovieDetail";
import PeoplePage from "../pages/People";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import BasicLayout from "../layouts/BasicLayout";
import PrivateRoute from "./PrivateRoute";

const AppRouter = ({ title}) => {
    const websiteTitle = "MovieCrate";

    return (<Router>
        <BasicLayout>
            <Routes>
                <Route exact path="/" element={<LandingPage title={websiteTitle + " | Welcome"} />} />
                <Route exact path="/movies" element={<MoviesPage title={websiteTitle + " | Search movies"} />} />
                <Route exact path="/movies/:id" element={<MovieDetailsPage />} />
                <Route exact path='/people' element={<PrivateRoute />}>
                    <Route exact path='/people/:id' element={<PeoplePage />} />
                </Route>
                <Route exact path="/login" element={<LoginPage title={websiteTitle + " | Login"} />} />
                <Route exact path="/register" element={<RegisterPage title={websiteTitle + " | Register"} />} />
                <Route path="*" element={<p>There is nothing here: 404!</p>} />
            </Routes>
        </BasicLayout>
    </Router>
    );
}

export default AppRouter;


