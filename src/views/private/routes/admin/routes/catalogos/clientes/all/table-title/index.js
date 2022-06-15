import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Button } from "antd";
import { TitleContainer } from "./elements";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const TableTitle = () => {
  return (
    <TitleContainer>
      <Title style={{ margin: "auto 10px" }} level={3}>
        Clientes
      </Title>
      <Link to="/catalogos/clientes/new">
        <Button type="primary" icon={<PlusOutlined />}>
          Agregar Cliente
        </Button>
      </Link>
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;
