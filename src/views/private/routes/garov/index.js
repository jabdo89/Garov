import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import Loadable from "react-loadable";

/* webpackChunkName: "Guias" */
const GuiasNuevo = Loadable({
  loader: () => import("./routes/guias/new"),
  loading: TopBarProgress,
});

const GuiasTodo = Loadable({
  loader: () => import("./routes/guias/all"),
  loading: TopBarProgress,
});

/* webpackChunkName: "Users" */
const AdminsNuevo = Loadable({
  loader: () => import("./routes/admins/new"),
  loading: TopBarProgress,
});

const AdminsTodo = Loadable({
  loader: () => import("./routes/admins/all"),
  loading: TopBarProgress,
});

const Dash = () => (
  <Switch>
    <Route path="/guias/all">
      <GuiasTodo />
    </Route>
    <Route path="/guias/new">
      <GuiasNuevo />
    </Route>
    <Route path="/admins/all">
      <AdminsTodo />
    </Route>
    <Route path="/admins/new">
      <AdminsNuevo />
    </Route>
    <Redirect to="/guias/all" />
  </Switch>
);

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Dash);
