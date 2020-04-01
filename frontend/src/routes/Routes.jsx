import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../components/common/Home";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import Blog from "../components/common/Blog";
import NotFound from "../components/common/NotFound";
import Delete from "../components/common/Delete";
import Edit from "../components/common/Edit";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" exact>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/blog/:id">
          <Blog />
        </PrivateRoute>
        <PrivateRoute path="/delete/:id">
          <Delete />
        </PrivateRoute>
        <PrivateRoute path="/edit/:id">
          <Edit />
        </PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
