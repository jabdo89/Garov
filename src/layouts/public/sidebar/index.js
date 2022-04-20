import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { Image } from 'antd';
import {
  UserOutlined,
  UserAddOutlined,
  // CreditCardOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  FormOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { breakpoints } from '@theme/media';
import { Menu, Sider } from './elements';

const { Item, SubMenu } = Menu;

const Sidebar = ({ history, collapsed, onCollapse, profile }) => {
  const [isLg, toggleLg] = useState(window.innerWidth > breakpoints.lg);

  const updateWidth = () => {
    toggleLg(window.innerWidth > breakpoints.lg);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  let routes;
  if (profile.rol === 'Admin') {
    routes = (
      <>
        <Item icon={<UnorderedListOutlined />} key="services">
          <Link to="/services/all">Servicios</Link>
        </Item>
        <SubMenu icon={<UserOutlined />} title="Choferes">
          <Item icon={<UserOutlined />} key="drivers/all">
            <Link to="/drivers/all">Todos</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="drivers/new">
            <Link to="/drivers/new">Nuevo</Link>
          </Item>
        </SubMenu>
        {/* <Item icon={<CreditCardOutlined />} key="payments">
          <Link to="/payments">Pagos</Link>
        </Item> */}
      </>
    );
  }
  if (profile.rol === 'Main') {
    routes = (
      <>
        <SubMenu icon={<FormOutlined />} title="Servicios">
          <Item icon={<UnorderedListOutlined />} key="services/all">
            <Link to="/services/all">Todos</Link>
          </Item>
          <Item icon={<PlusOutlined />} key="services/new">
            <Link to="/services/new">Nuevo</Link>
          </Item>
        </SubMenu>
        <SubMenu icon={<UserOutlined />} title="Usuarios">
          <Item icon={<UserOutlined />} key="users/all">
            <Link to="/users/all">Todos</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="users/new">
            <Link to="/users/new">Nuevo</Link>
          </Item>
        </SubMenu>
        <SubMenu icon={<HomeOutlined />} title="Hubs">
          <Item icon={<HomeOutlined />} key="hubs/all">
            <Link to="/hubs/all">Todos</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="hubs/new">
            <Link to="/hubs/new">Nuevo</Link>
          </Item>
        </SubMenu>
        {/* <Item icon={<CreditCardOutlined />} key="payments">
          <Link to="/payments">Pagos</Link>
        </Item> */}
      </>
    );
  }
  if (profile.rol === 'Empleado') {
    routes = (
      <>
        <SubMenu icon={<FormOutlined />} title="Servicios">
          <Item icon={<UnorderedListOutlined />} key="services/all">
            <Link to="/services/all">Todos</Link>
          </Item>
          <Item icon={<PlusOutlined />} key="services/new">
            <Link to="/services/new">Nuevo</Link>
          </Item>
        </SubMenu>
        <SubMenu icon={<HomeOutlined />} title="Hubs">
          <Item icon={<HomeOutlined />} key="hubs/all">
            <Link to="/hubs/all">Todos</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="hubs/new">
            <Link to="/hubs/new">Nuevo</Link>
          </Item>
        </SubMenu>
      </>
    );
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={isLg ? '80' : '0'}
      theme="dark"
      collapsed={collapsed}
      collapsible
      onCollapse={onCollapse}
    >
      <Image
        style={{ margin: '20px auto', display: 'block' }}
        height={30}
        src={`/images/brand/${collapsed ? 'isotype.svg' : 'logo_white.svg'}`}
        alt="Logo"
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={history.location.pathname.toLowerCase()}
        selectedKeys={history.location.pathname.toLowerCase()}
        mode="inline"
      >
        {routes}
      </Menu>
    </Sider>
  );
};

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

export default compose(connect(mapStateToProps), withRouter)(Sidebar);
