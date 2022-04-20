import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MainLayout from "../../layouts/main";
import AuthLayout from "../../layouts/auth";
import Authentication from "./routes/authentification";
import Admin from "./routes/admin";
import Garov from "./routes/garov";
import Company from "./routes/company";

function AuthIsLoaded() {
  const auth = useSelector((state) => state.firebase.auth);
  if (auth.isEmpty) return true;
  return false;
}

const Private = ({ profile, location }) => {
  let Layout;
  if (
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname.includes("recover")
  )
    Layout = AuthLayout;
  else Layout = MainLayout;
  console.log(profile);
  if (AuthIsLoaded()) {
    return (
      <Layout>
        <Authentication />
      </Layout>
    );
  }

  if (profile.rol === "Main") {
    return (
      <Layout>
        <Admin />
      </Layout>
    );
  }
  if (profile.rol === "Super") {
    return (
      <Layout>
        <Garov />
      </Layout>
    );
  }
  if (profile.rol === "Company") {
    return (
      <Layout>
        <Company />
      </Layout>
    );
  }
  return <Fragment />;
};

Private.defaultProps = {
  profile: undefined,
};

Private.propTypes = {
  profile: PropTypes.object,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(withRouter(Private));
