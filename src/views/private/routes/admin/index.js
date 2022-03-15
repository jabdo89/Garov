import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import Loadable from "react-loadable";

/* webpackChunkName: "Guias" */
const Guias = Loadable({
  loader: () => import("./routes/guias"),
  loading: TopBarProgress,
});

/* webpackChunkName: "Operadores" */
const OperadoresNuevo = Loadable({
  loader: () => import("./routes/operadores/new"),
  loading: TopBarProgress,
});

const OperadoresTodo = Loadable({
  loader: () => import("./routes/operadores/all"),
  loading: TopBarProgress,
});

/* webpackChunkName: "Documentar Guias" */
const DocumentarGuias = Loadable({
  loader: () => import("./routes/documentar-guias"),
  loading: TopBarProgress,
});

/* webpackChunkName: "Documentar Guias" */
const Corridas = Loadable({
  loader: () => import("./routes/corridas/all"),
  loading: TopBarProgress,
});

const CorridasNew = Loadable({
  loader: () => import("./routes/corridas/new"),
  loading: TopBarProgress,
});

// Catalogos
const ClientesAll = Loadable({
  loader: () => import("./routes/catalogos/clientes/all"),
  loading: TopBarProgress,
});

const ClientesNew = Loadable({
  loader: () => import("./routes/catalogos/clientes/new"),
  loading: TopBarProgress,
});

const UnidadesAll = Loadable({
  loader: () => import("./routes/catalogos/tipo-unidades/all"),
  loading: TopBarProgress,
});

const UnidadesNew = Loadable({
  loader: () => import("./routes/catalogos/tipo-unidades/new"),
  loading: TopBarProgress,
});

const ServiciosAll = Loadable({
  loader: () => import("./routes/catalogos/tipo-servicios/all"),
  loading: TopBarProgress,
});

const ServiciosNew = Loadable({
  loader: () => import("./routes/catalogos/tipo-servicios/new"),
  loading: TopBarProgress,
});

const Dash = () => (
  <Switch>
    <Route path="/guias">
      <Guias />
    </Route>
    <Route path="/corridas/all">
      <Corridas />
    </Route>
    <Route path="/corridas/new">
      <CorridasNew />
    </Route>
    <Route path="/operadores/new">
      <OperadoresNuevo />
    </Route>
    <Route path="/operadores/all">
      <OperadoresTodo />
    </Route>
    <Route path="/documentar">
      <DocumentarGuias />
    </Route>

    <Route path="/catalogos/clientes/all">
      <ClientesAll />
    </Route>
    <Route path="/catalogos/clientes/new">
      <ClientesNew />
    </Route>
    <Route path="/catalogos/unidades/all">
      <UnidadesAll />
    </Route>
    <Route path="/catalogos/unidades/new">
      <UnidadesNew />
    </Route>
    <Route path="/catalogos/servicios/all">
      <ServiciosAll />
    </Route>
    <Route path="/catalogos/servicios/new">
      <ServiciosNew />
    </Route>
    <Redirect to="/guias" />
  </Switch>
);

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Dash);
