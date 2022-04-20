import React from 'react';
import { Layout } from 'antd';
import { NavbarContainer } from './elements';

const { Header } = Layout;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Header>
        <img height={30} src="/images/brand/logo_white.svg" alt="Logo" />
      </Header>
    </NavbarContainer>
  );
};

export default Navbar;
