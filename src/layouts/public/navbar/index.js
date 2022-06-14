import React from "react";
import { Layout } from "antd";
import { NavbarContainer } from "./elements";
import Logo from "../../main/sidebar/garovLogo.png";

const { Header } = Layout;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Header>
        <img height={30} src={Logo} alt="Logo" />
      </Header>
    </NavbarContainer>
  );
};

export default Navbar;
