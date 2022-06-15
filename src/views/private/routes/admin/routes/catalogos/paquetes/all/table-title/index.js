import React from "react";
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
        Paquetes
      </Title>
      <Link to="/catalogos/paquetes/new">
        <Button type="primary" icon={<PlusOutlined />}>
          Agregar Paquete
        </Button>
      </Link>
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;
