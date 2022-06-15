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
        Plantas
      </Title>
      <Link to="/catalogos/plantas/new">
        <Button type="primary" icon={<PlusOutlined />}>
          Agregar Planta
        </Button>
      </Link>
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;
