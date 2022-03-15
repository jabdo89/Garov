import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, DatePicker, Button } from "antd";
import { TitleContainer } from "./elements";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const TableTitle = ({ data }) => {
  return (
    <TitleContainer>
      <Title style={{ margin: "auto 10px", marginRight: 40 }} level={3}>
        Operadores
      </Title>
      <RangePicker style={{ marginRight: 20 }} />

      <Link to="/operadores/new">
        <Button type="primary" icon={<PlusOutlined />}>
          Agregar Operador
        </Button>
      </Link>
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;
