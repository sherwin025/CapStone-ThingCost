import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./ThingCost.css";
import { UserItemProvider } from "./Analyze/FormProvider";


export const ThingCost = () => (
    <>
        <UserItemProvider>
            <Route
                render={() => {
                    if (localStorage.getItem("ThingCost_customer")) {
                        return (
                            <>
                                <a href="/"><h1>ThingCost</h1></a>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </UserItemProvider>
    </>
);

