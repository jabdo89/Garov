import React from 'react';
import PropTypes from 'prop-types';
import { Layout as Layer } from 'antd';
import Navbar from './navbar';
import Footer from './footer';

const MainLayout = ({ children }) => {
  return (
    <Layer style={{ minHeight: '100vh', maxHeight: '100vh' }}>
      <Navbar />
      {children}
      <Footer />
    </Layer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired
};

export default MainLayout;
