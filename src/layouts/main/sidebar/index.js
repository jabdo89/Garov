import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import { Image } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  FormOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { breakpoints } from "../../../theme/media";
import { Menu, Sider } from "./elements";
import Logo from "./garovLogo.png";

const { Item, SubMenu } = Menu;

const Sidebar = ({ history, collapsed, onCollapse, profile }) => {
  const [isLg, toggleLg] = useState(window.innerWidth > breakpoints.lg);

  const updateWidth = () => {
    toggleLg(window.innerWidth > breakpoints.lg);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  let routes;
  if (profile.rol === "Main") {
    routes = (
      <>
        <Item icon={<FormOutlined />} key="guias">
          <Link to="/guias">Guias</Link>
        </Item>
        <Item icon={<UnorderedListOutlined />} key="documentar">
          <Link to="/documentar">Documentar Guias</Link>
        </Item>
        <Item icon={<FormOutlined />} key="corridas">
          <Link to="/corridas/all">Corridas</Link>
        </Item>
        <Item icon={<UsergroupAddOutlined />} key="operadores/all">
          <Link to="/operadores/all">Operadores</Link>
        </Item>
        <Item icon={<FileSearchOutlined />} key="evidencias/all">
          <Link to="/evidencias/all">Evidencias</Link>
        </Item>
        <SubMenu icon={<UserOutlined />} title="Catalogos">
          <Item icon={<UserAddOutlined />} key="catalogos/clientes/all">
            <Link to="/catalogos/clientes/all">Clientes</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="operadores/new">
            <Link to="/operadores/new">Paquetes</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="operadores/new">
            <Link to="/operadores/new">Plantas</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="operadores/new">
            <Link to="/operadores/new">Sucursales</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="operadores/new">
            <Link to="/operadores/new">Tipo Guias</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="operadores/new">
            <Link to="/catalogos/servicios/all">Tipo Servicios</Link>
          </Item>
          <Item icon={<UserAddOutlined />} key="catalogo/unidades/new">
            <Link to="/catalogos/unidades/all">Tipo Unidades</Link>
          </Item>
        </SubMenu>
      </>
    );
  }
  if (profile.rol === "User") {
    routes = (
      <>
        <Item icon={<UnorderedListOutlined />} key="guias/all">
          <Link to="/guias/all">Guias</Link>
        </Item>
        <Item icon={<FileSearchOutlined />} key="evidencias">
          <Link to="/evidencias">Evidencias</Link>
        </Item>
      </>
    );
  }
  if (profile.rol === "Company") {
    routes = (
      <>
        <Item icon={<UnorderedListOutlined />} key="guias/all">
          <Link to="/guias/all">Guias</Link>
        </Item>
      </>
    );
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={isLg ? "80" : "0"}
      theme="dark"
      collapsed={collapsed}
      collapsible
      onCollapse={onCollapse}
    >
      <Image
        style={{
          margin: "20px auto",
          display: "block",
          paddingLeft: 20,
          paddingRight: 20,
        }}
        height={30}
        src={Logo}
        // src={`/images/brand/${collapsed ? "isotype.svg" : "logo_white.svg"}`}
        alt=""
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
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default compose(connect(mapStateToProps), withRouter)(Sidebar);
