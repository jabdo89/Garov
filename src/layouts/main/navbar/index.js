/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { PageHeader } from "antd";
import { signOut } from "../../../redux/Actions/authActions";
import { NavbarContainer, Menu } from "./elements";

const { Item } = Menu;

class NavBar extends Component {
  handleLogout = () => {
    const { signOut: localeSignOut } = this.props;
    localeSignOut();
  };

  format = (pathname) => {
    const title = pathname
      .substring(pathname.lastIndexOf("/") + 1)
      .replace(/-/g, " ");
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  render() {
    const { history, location, profile } = this.props;
    return (
      <NavbarContainer>
        <Menu
          mode="horizontal"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <PageHeader
            style={{ marginRight: "auto", padding: "0px 20px" }}
            onBack={() => history.goBack()}
            title={this.format(location.pathname)}
          />

          <Item key="1" disabled>
            <span>{profile.email}</span>
          </Item>
          <Item key="3" onClick={this.handleLogout}>
            <span>Salir</span>
          </Item>
        </Menu>
      </NavbarContainer>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
