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

const GuiasNew = Loadable({
  loader: () => import("./routes/guias/new"),
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

/* webpackChunkName: "Documentar Guias" */
const Evidencias = Loadable({
  loader: () => import("./routes/evidencias"),
  loading: TopBarProgress,
});

/* webpackChunkName: "Regresados" */
const Regresados = Loadable({
  loader: () => import("./routes/regresados"),
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

const PlantasAll = Loadable({
  loader: () => import("./routes/catalogos/plantas/all"),
  loading: TopBarProgress,
});

const PlantasNew = Loadable({
  loader: () => import("./routes/catalogos/plantas/new"),
  loading: TopBarProgress,
});

const PaquetesAll = Loadable({
  loader: () => import("./routes/catalogos/paquetes/all"),
  loading: TopBarProgress,
});

const PaquetesNew = Loadable({
  loader: () => import("./routes/catalogos/paquetes/new"),
  loading: TopBarProgress,
});

const SucursalesAll = Loadable({
  loader: () => import("./routes/catalogos/sucursales/all"),
  loading: TopBarProgress,
});

const SucursalesNew = Loadable({
  loader: () => import("./routes/catalogos/sucursales/new"),
  loading: TopBarProgress,
});

const TipoGuiasAll = Loadable({
  loader: () => import("./routes/catalogos/tipo-guias/all"),
  loading: TopBarProgress,
});

const TipoGuiasNew = Loadable({
  loader: () => import("./routes/catalogos/tipo-guias/new"),
  loading: TopBarProgress,
});

const Dash = () => (
  <Switch>
    <Route path="/guias/all">
      <Guias />
    </Route>
    <Route path="/guias/new">
      <GuiasNew />
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
    {/* <Route path="/evidencias">
      <Evidencias />
    </Route> */}
    <Route path="/regresados">
      <Regresados />
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
    <Route path="/catalogos/plantas/all">
      <PlantasAll />
    </Route>
    <Route path="/catalogos/plantas/new">
      <PlantasNew />
    </Route>
    <Route path="/catalogos/paquetes/all">
      <PaquetesAll />
    </Route>
    <Route path="/catalogos/paquetes/new">
      <PaquetesNew />
    </Route>
    <Route path="/catalogos/sucursales/all">
      <SucursalesAll />
    </Route>
    <Route path="/catalogos/sucursales/new">
      <SucursalesNew />
    </Route>
    <Route path="/catalogos/guias/all">
      <TipoGuiasAll />
    </Route>
    <Route path="/catalogos/guias/new">
      <TipoGuiasNew />
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
