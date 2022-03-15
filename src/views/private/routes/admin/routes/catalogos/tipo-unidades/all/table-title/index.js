import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Typography, Button } from "antd";
import { TitleContainer } from "./elements";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Search } = Input;

const TableTitle = ({ search, setSearch, data }) => {
  return (
    <TitleContainer>
      <Title style={{ margin: "auto 10px" }} level={3}>
        Unidades
      </Title>
      <Search
        style={{ width: 250, margin: "auto 10px auto auto" }}
        allowClear
        value={search}
        placeholder="Buscar Unidad"
        onChange={({ target: { value } }) => setSearch(value)}
      />
      <Link to="/catalogos/unidades/new">
        <Button type="primary" icon={<PlusOutlined />}>
          Agregar Unidad
        </Button>
      </Link>
    </TitleContainer>
  );
};

TableTitle.propTypes = {
  searchSubmit: PropTypes.func.isRequired,
};

export default TableTitle;
